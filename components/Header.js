import { Flex, Button } from "@chakra-ui/react";
import React from "react";

function Header() {
  return (
    <Flex
      alignItems="center"
      justifyContent="flex-end"
      m="0 auto"
      w="full"
      px={10}
      py={5}
    >
      <Button _hover={{ bg: "orange" }}>connect wallet</Button>
    </Flex>
  );
}

export default Header;
