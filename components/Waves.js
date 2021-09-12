import React, { useEffect, useState } from "react";
import { Box, Center, Text, Stack, Input, FormControl } from "@chakra-ui/react";
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
              <Text as="span">Message</Text>

              <Text as="span">Address</Text>
              <Text as="span">Time</Text>
            </Box>
            {allWaves.map((wave) => {
              return (
                <Box
                  key={wave.timestamp}
                  d="flex"
                  alignItems="baseline"
                  flexDir="row"
                  justifyContent="space-between"
                  _hover={{ bg: "tomato" }}
                  rounded="xl"
                  p={2}
                  _hover={{ bg: "green.600" }}
                >
                  <Text>{wave.message}</Text>
                  <Text>{wave.address}</Text>

                  <Text>
                    <Moment
                      tz="America/Los_Angeles"
                      format="hh:mm MM/DD/YYYY"
                      date={wave.timestamp.toString()}
                    ></Moment>
                  </Text>
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
