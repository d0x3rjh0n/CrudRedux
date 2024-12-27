import { InputGroup } from "../components/ui/input-group";
import { MdCategory } from "react-icons/md";
import { Grid, GridItem } from "@chakra-ui/react";
import MyLabel from "./MyLabel";
import { Field } from "./ui/field";
import { Props } from "./NameAndDateFields";
import { NativeSelectField, NativeSelectRoot } from "./ui/native-select";

const SelectsFields = ({ register, errors }: Props) => {
  return (
    <Grid templateColumns={"repeat(2, 1fr)"} gap={3} w={"full"}>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Field
          required
          label={<MyLabel>Priority</MyLabel>}
          invalid={!!errors.priority}
          errorText={errors.priority?.message}
        >
          <NativeSelectRoot {...register("priority")} size="md">
            <InputGroup
              flex={1}
              startElement={<MdCategory size={"1.2em"} />}
              w={"full"}
            >
              <NativeSelectField
                outline={"none"}
                border={"1px solid"}
                borderColor={"gray.200"}
                transition={"all"}
                _focus={{ shadow: "lg" }}
                focusRing={"inside"}
                focusRingColor={"blue.600"}
                style={{ paddingLeft: "10em" }}
              >
                {prioritys.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </NativeSelectField>
            </InputGroup>
          </NativeSelectRoot>
        </Field>
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <Field
          required
          label={<MyLabel>Categorie</MyLabel>}
          invalid={!!errors.categorie}
          errorText={errors.categorie?.message}
        >
          <NativeSelectRoot {...register("categorie")} size="md">
            <InputGroup
              flex={1}
              startElement={<MdCategory size={"1.2em"} />}
              w={"full"}
            >
              <NativeSelectField
                outline={"none"}
                border={"1px solid"}
                borderColor={"gray.200"}
                transition={"all"}
                _focus={{ shadow: "lg" }}
                focusRing={"inside"}
                focusRingColor={"blue.600"}
                style={{ paddingLeft: "10em" }}
              >
                {categories.map((categorie) => (
                  <option key={categorie.value} value={categorie.value}>
                    {categorie.label}
                  </option>
                ))}
              </NativeSelectField>
            </InputGroup>
          </NativeSelectRoot>
        </Field>
      </GridItem>
    </Grid>
  );
};

export default SelectsFields;

const prioritys = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const categories = [
  { label: "Marketing", value: "marketing" },
  { label: "Web-Dev", value: "web-dev" },
  { label: "Account-Services", value: "account-service" },
];
