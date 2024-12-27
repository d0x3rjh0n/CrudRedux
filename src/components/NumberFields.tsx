import { MdOutlineReduceCapacity } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Grid, GridItem } from "@chakra-ui/react";
import MyLabel from "./MyLabel";
import { InputGroup } from "./ui/input-group";
import { Field } from "./ui/field";
import { Props } from "./NameAndDateFields";
import {
  NumberInputField,
  NumberInputRoot,
} from "../components/ui/number-input";

const NumberFields = ({ register, errors }: Props) => {
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={5} w={"full"}>
      <GridItem colSpan={1}>
        <Field
          required
          label={<MyLabel>Capacity</MyLabel>}
          invalid={!!errors.capacity}
          errorText={errors.capacity?.message}
        >
          <NumberInputRoot size={"md"} width="170px">
            <InputGroup
              flex={1}
              startElement={<MdOutlineReduceCapacity size={"1.2em"} />}
              w={"full"}
            >
              <NumberInputField
                outline={"none"}
                border={"1px solid"}
                borderColor={"gray.200"}
                transition={"all"}
                _focus={{ shadow: "lg" }}
                focusRing={"inside"}
                focusRingColor={"blue.600"}
                {...register("capacity")}
              />
            </InputGroup>
          </NumberInputRoot>
        </Field>
      </GridItem>
      <GridItem colSpan={1}>
        <Field
          required
          label={<MyLabel>Budget</MyLabel>}
          invalid={!!errors.budget}
          errorText={errors.budget?.message}
        >
          <NumberInputRoot size={"md"} width="170px">
            <InputGroup
              flex={1}
              startElement={<MdOutlineAttachMoney size={"1.2em"} />}
              w={"full"}
            >
              <NumberInputField
                outline={"none"}
                border={"1px solid"}
                borderColor={"gray.200"}
                transition={"all"}
                _focus={{ shadow: "lg" }}
                focusRing={"inside"}
                focusRingColor={"blue.600"}
                {...register("budget")}
              />
            </InputGroup>
          </NumberInputRoot>
        </Field>
      </GridItem>
    </Grid>
  );
};

export default NumberFields;
