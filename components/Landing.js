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
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import abi from "../utils/WavePortal.json";
import Waves from "./Waves";

function Landing() {
  const [currAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState("");

  const handleChange = (event) => setValue(event.target.value);
  const contractAddress = "0xF05fab7E54F9FFfAe07EEbB64911F6Eaa0Ac735d";
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
        getAllWaves();
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
    let msg;
    if (value === "") {
      msg = "👋";
    } else {
      msg = value;
    }

    let count = await waveportalContract.getTotalWaves();
    // console.log("Total wave count...", count.toNumber());

    const waveTxn = await waveportalContract.wave(msg, {
      gasLimit: 300000,
    });
    // console.log("Mining...", waveTxn.hash);
    setLoading(true);
    setMessage("Mining... ⛏️");
    await waveTxn.wait();
    // console.log("Mined --", waveTxn.hash);
    setMessage("Successfully Mined! 🎉");

    count = await waveportalContract.getTotalWaves();
    // console.log("Total wave count...", count.toNumber());

    getAllWaves();
    setLoading(false);
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
      // console.log("wave", wave);
      wavesCleaned.push({
        address: wave.waver,
        timestamp: new Date(wave.timestamp * 1000),
        message: wave.message,
      });
    });
    // console.log("cleaned", wavesCleaned);
    setAllWaves(wavesCleaned.reverse());

    waveportalContract.on("NewWave", (from, timestamp, message) => {
      // console.log("NewWave", from, timestamp, message);
      setAllWaves((wavesCleaned) => [
        ...wavesCleaned,
        {
          address: from,
          timestamp: new Date(timestamp * 100),
          message: message,
        },
      ]);
    });
  }

  useEffect(() => {
    checkIfWalletIsConnected();

    // if (currAccount) {
    //   getAllWaves();
    // }
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
        {currAccount ? (
          <Button _hover={{ bg: "orange.500" }}>
            <Text isTruncated>😎 {currAccount}</Text>
          </Button>
        ) : (
          <Button _hover={{ bg: "orange.500" }} onClick={connectWallet}>
            connect wallet 🏦
          </Button>
        )}
      </Flex>
      <Center
        d="flex"
        mx="auto"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        h="50vh"
      >
        {" "}
        <Heading mb={2} _hover={{ color: "orange.500" }}>
          Welcome 👋
        </Heading>
        <Text mb={10}>
          {" "}
          Being built by{" "}
          <Link href="https://parthm.dev" _hover={{ color: "orange.500" }}>
            Parth M.
          </Link>
        </Text>
        {loading ? (
          <Center mt={64}>
            <VStack>
              <Spinner color="green.500" mb={2} />
              <Heading>{msg}</Heading>
            </VStack>
          </Center>
        ) : (
          <>
            <Input
              mt={64}
              w="25%"
              rounded="lg"
              focusBorderColor="green.500"
              placeholder="Add a message"
              value={value}
              onChange={handleChange}
            ></Input>
            <Button
              mt={4}
              bg="green.600"
              onClick={wave}
              rounded="lg"
              disabled={!currAccount}
              _hover={{ bg: "orange.500" }}
            >
              wave at me
            </Button>
          </>
        )}
      </Center>
      <Box mt={12}>
        <Waves allWaves={allWaves} />
      </Box>
    </>
  );
}

export default Landing;
