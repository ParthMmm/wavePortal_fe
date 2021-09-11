import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  Flex,
  Box,
  Center,
  Text,
  Heading,
  Link,
  Button,
  Stack,
} from "@chakra-ui/react";
import Header from "./Header";
import abi from "../utils/WavePortal.json";
function Landing() {
  const [currAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);

  const contractAddress = "0xce86CC73cd607a4F7Fb0946f57a424c0932e1cb9";
  const contractABI = abi.abi;
  const checkIfWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("we have the ethereum object", ethereum);
    }
    ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    });
  };

  const connectWallet = () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get metamask!");
    }

    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      })
      .catch((err) => console.log(err));
  };

  const wave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const waveportalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    let count = await waveportalContract.getTotalWaves();
    console.log("Total wave count...", count.toNumber());

    const waveTxn = await waveportalContract.wave("this is a message");
    console.log("Mining...", waveTxn.hash);
    await waveTxn.wait();
    console.log("Mined --", waveTxn.hash);

    count = await waveportalContract.getTotalWaves();
    console.log("Total wave count...", count.toNumber());
  };

  async function getAllWaves() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const waveportalContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    let waves = await waveportalContract.getAllWaves();

    let wavesCleaned = [];
    waves.forEach((wave) => {
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      });
    });

    setAllWaves(wavesCleaned);
    console.log(allWaves);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    if (currAccount) {
      getAllWaves();
    }
  }, []);
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        m="0 auto"
        w="full"
        px={10}
        py={5}
      >
        <Button _hover={{ bg: "orange" }} onClick={connectWallet}>
          connect wallet
        </Button>
      </Flex>
      <Box>
        <Center
          d="flex"
          mx="auto"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          h="60vh"
        >
          <Heading mb={2}>Welcome 👋</Heading>
          <Text mb={2}>
            {" "}
            Being built by <Link href="https://parthm.dev">Parth M.</Link>
          </Text>
          <Button mt={2} colorScheme="green" onClick={wave}>
            wave at me
          </Button>
        </Center>
      </Box>
      <Center>
        <Box mt={1} rounded="xl" boxShadow="lg" p={5} mb={5} w="80%">
          <Stack spacing={5}>
            <Box
              d="flex"
              alignItems="baseline"
              flexDir="row"
              justifyContent="space-between"
              _hover={{ bg: "tomato" }}
              rounded="xl"
              p={2}
            >
              <Text as="span">Address</Text>
              <Text as="span">Time</Text>
              <Text as="span">Message</Text>
            </Box>
            {allWaves.map((wave, index) => {
              return (
                <Box
                  d="flex"
                  alignItems="baseline"
                  flexDir="row"
                  justifyContent="space-between"
                  _hover={{ bg: "tomato" }}
                  rounded="xl"
                  p={2}
                >
                  <Text as="span">{wave.address}</Text>
                  <Text as="span">{wave.timestamp.toString()}</Text>
                  <Text as="span">{wave.message}</Text>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Center>
    </>
  );
}

export default Landing;
