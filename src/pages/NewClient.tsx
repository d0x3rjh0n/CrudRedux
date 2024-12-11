import { Button } from "../components/ui/button"
import { Field } from "../components/ui/field"
import { Center, Heading, Highlight, Input, Stack } from "@chakra-ui/react"
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { InputGroup } from "../components/ui/input-group"
import { BiUser } from "react-icons/bi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { MdOutlineNumbers } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { useAddClientMutation } from "@/api/endpoints/clientEndpoints"
import { generateId } from "@/helpers"
import { Client } from '../types'
import { toaster } from "@/components/ui/toaster"
interface FormValues {
    name: string
    age: number
    email: string
    phone: string

}

const schema = Yup.object().shape({
    name: Yup.string().required('Requided Field'),
    age: Yup.number().integer('Candela').min(0).max(120).required('Requided Field'),
    email: Yup.string().email('Invalid email').required('Requided Field'),
    phone: Yup.string().required('Required Field').min(8, 'Must be at least 8 characters').max(15, 'Must be 15 characters or less'),
})



const NewClient = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) })
    const [addClient] = useAddClientMutation()
    const navigate = useNavigate()
    
    const onSubmit = handleSubmit(async (data) => {
        const newClient : Client = {
            id: generateId(),
            name : data.name,
            age : data.age,
            email : data.email,
            phone : data.phone
        };
        try {
            await addClient(newClient).unwrap();
            toaster.create({type: 'success',title: 'Successfully added client'})
            navigate('/');
        } catch (error) {
            console.error('Error adding client:', error);
        }
        reset();
    });
    return (
        <Center md={{ height :'600px' }} height={'450px'}>
        <form onSubmit={onSubmit} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Stack maxW={'md'} gap="4" align="flex-center" w={'full'} border={'1px solid'} p={'5'} shadow={'md'} borderColor={'gray.100'} borderRadius={'xs'}>
                <Heading>
                    <Highlight query={'New Client'} styles={{ color : 'blackAlpha.800', fontSize: '2xl'}}>
                        New Client
                    </Highlight>
                </Heading>
                <Field invalid={!!errors.name} errorText={errors.name?.message} orientation={'vertical'} label={'Customer name'}>
                    <InputGroup flex={'1'} startElement={<BiUser size={'1.2em'} />} w={'full'}>
                        <Input outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} focusRing={'inside'} focusRingColor={'purple.300'} {...register('name')} size={'md'} autoComplete="off" />
                    </InputGroup>
                </Field>
                <Field invalid={!!errors.email} errorText={errors.email?.message} orientation={'vertical'} label={'Customer email'}>
                    <InputGroup flex={'1'} startElement={<MdOutlineAttachEmail size={'1.2em'} />} w={'full'}>
                        <Input outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} focusRing={'inside'} focusRingColor={'purple.300'} {...register('email')} size={'md'} />
                    </InputGroup>
                </Field>
                <Field invalid={!!errors.age} errorText={errors.age?.message} orientation={'vertical'} label={'Customer Age'}>
                    <InputGroup flex={'1'} startElement={<MdOutlineNumbers size={'1.2em'} />} w={'full'}>
                        <Input outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} focusRing={'inside'} focusRingColor={'purple.300'} {...register('age')} size={'md'} />
                    </InputGroup>
                </Field>
                <Field invalid={!!errors.phone} errorText={errors.phone?.message} orientation={'vertical'} label={'Customer Phone'}>
                    <InputGroup flex={'1'} startElement={<FaPhone size={'1.2em'} />} w={'full'}>
                        <Input outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} focusRing={'inside'} focusRingColor={'purple.300'} {...register('phone')} size={'md'} />
                    </InputGroup>
                </Field>
                <Button type="submit" colorPalette={'purple'} variant={"solid"}>Add Customer</Button>
            </Stack>
        </form>
        </Center>
    )
}

export default NewClient