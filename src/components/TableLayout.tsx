import Header from "./Header";
import { Box, Heading, Input, Table } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";
import { InputGroup } from "./ui/input-group";
import { ReactNode } from "react";

interface Props {
  heading: string;
  linkName: string;
  linkPath: string;
  LinkIcon: IconType;
  searchValue: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  SearchIcon: IconType;
  placeholder: string;
  children: ReactNode;
}

const TableLayout = ({
  heading,
  linkName,
  linkPath,
  LinkIcon,
  searchValue,
  handleFilterChange,
  SearchIcon,
  placeholder,
  children,
}: Props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      w={"full"}
      alignItems={"center"}
      gap={2}
      mt={6}
    >
      <Header />
      <Box
        bg={"white"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        w={{ base: "90%", md: "80%", xl: "60%" }}
        p={3}
        shadow={"2xl"}
        rounded={"md"}
        data-state="open"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "600ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "600ms",
        }}
      >
        <Box
          w={"full"}
          mb={"3"}
          display={"flex"}
          justifyContent={"space-between"}
          gap={"2"}
          alignItems={"center"}
          mt={"3"}
        >
          <Heading
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight={"bold"}
            color={"blackAlpha.700"}
          >
            {heading}
          </Heading>
          <Link to={linkPath}>
            <Button
              _hover={{ bg: "blue.800" }}
              variant={"solid"}
              bg={"blue.700"}
              size={{ base: "xs", md: "sm" }}
              rounded={"md"}
            >
              {linkName}
              <LinkIcon />
            </Button>
          </Link>
        </Box>
        <InputGroup
          w={"full"}
          flex={"1"}
          mb={"4"}
          startElement={<SearchIcon />}
        >
          <Input
            _focus={{ shadow: "md" }}
            borderRadius={"md"}
            outline={"none"}
            focusRing={"inside"}
            focusRingColor={"blue.600"}
            transition={"all"}
            placeholder={`Search ${placeholder} for name`}
            value={searchValue}
            onChange={handleFilterChange}
          />
        </InputGroup>
        <Table.ScrollArea w={"100%"} h={"2xl"}>
          {children}
        </Table.ScrollArea>
      </Box>
    </Box>
  );
};

export default TableLayout;
