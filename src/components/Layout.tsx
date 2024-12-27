import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Flex
      backgroundImage={"url(/back.png)"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"center"}
      flexDirection={"column"}
      gap={4}
      justifyContent={"space-between"}
      height={"100vh"}
      display={"flex"}
    >
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;
