import React from "react";
import { useToast, Button } from "@chakra-ui/react";

function Toast({ msg }) {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: { msg },
          status: "info",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}

export default Toast;
