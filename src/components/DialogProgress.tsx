import { Button } from "./ui/button"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger,} from "./ui/dialog"
import { Field } from "./ui/field";
import { NumberInputField, NumberInputRoot } from "./ui/number-input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Flex, IconButton } from "@chakra-ui/react";
import { useUpdateProgressMutation } from "@/api/endpoints/projectEndpoints";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { GiProgression } from "react-icons/gi";

interface Props {
    id: string
}
interface FormValues {
    progress : number
}

const schema = yup.object().shape({
    progress : yup.number().positive('The progress must be positive').required('The progress must be required').max(100, 'The progres must be low than 100%')
})
const DialogProgress = ({id}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [ updateProject ] = useUpdateProgressMutation()
    const { register, reset, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver: yupResolver(schema)})
    const onSubmit = handleSubmit(async (newProgress: FormValues) => {
        try {
            await updateProject([id, newProgress])
            setOpen(false)
            toaster.create({type: 'success', title: 'Success', description: 'The new progress has been stablished'})
        } catch (error) {
            console.log(error);
        }
        reset()
    })
  return (
        <DialogRoot open={open} size={'xs'} placement={'center'} role="alertdialog">
            <DialogTrigger asChild>
                <IconButton onClick={() => setOpen(true)} variant={"ghost"} colorPalette={'blue'} size={'xs'}><GiProgression/></IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Select a new Progress</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={onSubmit}>
                        <Field label="Enter Progress" invalid={!!errors.progress} errorText={errors.progress?.message}>
                            <NumberInputRoot width="200px">
                                <NumberInputField outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} _focus={{shadow: 'lg'}} focusRing={'inside'} focusRingColor={'blue.600'} {...register('progress')}/>
                            </NumberInputRoot>
                        </Field>
                        <Flex justifyContent={'space-between'} mt={5}>
                            <DialogActionTrigger asChild>
                            <Button variant="solid" colorPalette={'red'} onClick={() => setOpen(false)}>Cancel</Button>
                            </DialogActionTrigger>
                            <Button type="submit" bg="blue.700">Update</Button>
                        </Flex>
                    </form>
                </DialogBody>
                <DialogCloseTrigger onClick={() => setOpen(false)}/>
            </DialogContent>
            
        </DialogRoot>
  )
}

export default DialogProgress