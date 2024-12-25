import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FormValues } from "@/pages/NewProject"
import { TbFoldersFilled } from "react-icons/tb";
import { Grid, GridItem, Input } from "@chakra-ui/react";
import MyLabel from "./MyLabel";
import { InputGroup } from "./ui/input-group";
import { Field } from "./ui/field";

export interface Props {
    register: UseFormRegister<FormValues>
    errors: FieldErrors<FormValues>
}

const NameAndDateFields = ({register, errors}: Props) => {
  return (
    <Grid templateColumns={'repeat(4, 1fr)'} gap={2}>
        <GridItem colSpan={4}>
            <Field label={<MyLabel>Name of project</MyLabel>} invalid={!!errors.name} errorText={errors.name?.message}>
            <InputGroup flex={1} startElement={<TbFoldersFilled size={'1.2em'}/>} w={'full'}>
                <Input size={'md'} outline={'none'}  {...register('name')} />
            </InputGroup>
            </Field>
        </GridItem>
    </Grid>
  )
}

export default NameAndDateFields