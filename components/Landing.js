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
} from "@chakra-ui/react";
import Header from "./Header";
import abi from "../utils/WavePortal.json";
function Landing() {
  const [currAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xf1e2753Dc0D9185Aa685F69d7566cD7Dd91f6287";
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

    const waveTxn = await waveportalContract.wave();
    console.log("Mining...", waveTxn.hash);
    await waveTxn.wait();
    console.log("Mined --", waveTxn.hash);

    count = await waveportalContract.getTotalWaves();
    console.log("Total wave count...", count.toNumber());
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  });
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
          my="auto"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          h="90vh"
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
    </>
  );
}

export default Landing;
