import React, { useEffect, useState } from "react";
import { Box, Center, Text, Stack, Link, Heading } from "@chakra-ui/react";
import Moment from "react-moment";
import "moment-timezone";

function Waves({ allWaves }) {
  return (
    <div>
      <Center>
        <Box mt={1} rounded="xl" boxShadow="lg" p={5} mb={5} w="80%">
          <Stack spacing={5}>
            <Box
              d="flex"
              alignItems="baseline"
              flexDir="row"
              justifyContent="space-between"
              rounded="xl"
              p={2}
            >
              <Heading color="green.600">messages ✉️</Heading>
              {/* <Text as="span">Message</Text>

              <Text as="span">Address</Text>
              <Text as="span">Time</Text> */}
            </Box>
            {allWaves.map((wave) => {
              return (
                <Box
                  key={wave.timestamp}
                  d="flex"
                  alignItems="baseline"
                  flexDir="row"
                  justifyContent="space-between"
                  rounded="xl"
                  p={2}
                  _hover={{ bg: "green.600" }}
                >
                  <Box>
                    <Heading _hover={{ color: "orange.400" }}>
                      {wave.message}
                    </Heading>
                    <Text fontSize="sm">
                      from{" "}
                      <Link
                        href={`https://etherscan.io/address/${wave.address}`}
                        _hover={{ color: "orange.400" }}
                      >
                        {wave.address}
                      </Link>
                    </Text>
                  </Box>
                  <Box>
                    <Text>
                      <Moment
                        tz="America/Los_Angeles"
                        format="hh:mm MM/DD/YYYY"
                        date={wave.timestamp.toString()}
                      ></Moment>
                    </Text>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Center>
    </div>
  );
}

export default Waves;
