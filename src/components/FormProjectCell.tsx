import { Flex, GridItem, Text } from "@chakra-ui/react";
import MyLabel from "./MyLabel";
import { ReactNode } from "react";
import { StyledBox } from "./AcordionProject";
import { Status } from "./ui/status";

interface Prop {
  label: string;
  data: string | ReactNode;
}

const FormProjectCell = ({ label, data }: Prop) => {
  return (
    <GridItem colSpan={{ base: 3, md: 1 }}>
      <StyledBox>
        <Flex
          flexDirection={{ base: "row", md: "column" }}
          justifyContent={"space-between"}
          alignItems={{ base: "center", md: "start" }}
        >
          <MyLabel>{label}</MyLabel>
          <Flex gap={2}>
            {label === "Status" && (
              <Status value={data === "active" ? "success" : "error"} />
            )}
            <Text
              color={
                label === "Status"
                  ? data === "active"
                    ? "green"
                    : "red"
                  : "black"
              }
              fontWeight={"light"}
            >
              {data}
            </Text>
          </Flex>
        </Flex>
      </StyledBox>
    </GridItem>
  );
};

export default FormProjectCell;
