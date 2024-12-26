import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FormValues } from "@/pages/NewProject"
import { TbFoldersFilled } from "react-icons/tb";
import { Grid, GridItem } from "@chakra-ui/react";
import MyLabel from "./MyLabel";

import { Field } from "./ui/field";
import InputProject from "./InputProject";

export interface Props {
    register: UseFormRegister<FormValues>
    errors: FieldErrors<FormValues>
}

const NameAndDateFields = ({register, errors}: Props) => {
  return (
    <Grid templateColumns={'repeat(4, 1fr)'} gap={2} w={'full'}>
        <GridItem colSpan={4}>
            <Field required label={<MyLabel>Name of project</MyLabel>} invalid={!!errors.name} errorText={errors.name?.message}>
              <InputProject element={TbFoldersFilled} register={register} value="name"/>
            </Field>
        </GridItem>
    </Grid>
  )
}

export default NameAndDateFields