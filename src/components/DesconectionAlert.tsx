import { Center } from "@chakra-ui/react";
import { Alert } from "./ui/alert";

const DesconectionAlert = () => {
  return (
    <Center>
      <Alert size={"lg"} status="error" title="Server offline">
        The connection to the server could not be established.
      </Alert>
    </Center>
  );
};

export default DesconectionAlert;
