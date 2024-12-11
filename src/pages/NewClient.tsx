import { Button } from "../components/ui/button"
import { Field } from "../components/ui/field"
import { Input, Stack } from "@chakra-ui/react"
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { InputGroup } from "../components/ui/input-group"
import { BiUser } from "react-icons/bi";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom"

interface FormValues {
    name: string
    age: number
    email: string
}

const schema = Yup.object().shape({
    name: Yup.string().required('Campo Requerido'),
    age: Yup.number().integer().min(0).max(120).required('Campo Requerido'),
    email: Yup.string().email('Email no válido').required('Campo Requerido'),

})

//import { useDispatch } from "react-redux"




const NewClient = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) })
    const navigate = useNavigate()
    //const dispatch = useDispatch()
    const onSubmit = handleSubmit(() => {
        navigate('/')
        reset()
    })

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Stack maxW={'md'} gap="4" align="flex-center" w={'full'} border={'1px solid'} p={'3'} shadow={'2xl'} borderColor={'gray.200'} borderRadius={'xs'}>
                <Field invalid={!!errors.name} errorText={errors.name?.message} orientation={'vertical'} label={'Customer name'}>
                    <InputGroup flex={'1'} startElement={<BiUser size={'1.2em'} />} w={'full'}>
                        <Input {...register('name')} size={'md'} autoComplete="off" />
                    </InputGroup>
                </Field>
                <Field invalid={!!errors.email} errorText={errors.email?.message} orientation={'vertical'} label={'Customer email'}>
                    <InputGroup flex={'1'} startElement={<MdOutlineAttachEmail size={'1.2em'} />} w={'full'}>
                        <Input {...register('email')} size={'md'} />
                    </InputGroup>
                </Field>
                <Field invalid={!!errors.age} errorText={errors.age?.message} orientation={'vertical'} label={'Customer Age'}>
                    <InputGroup flex={'1'} startElement={<HiOutlineIdentification size={'1.2em'} />} w={'full'}>
                        <Input {...register('age')} size={'md'} />
                    </InputGroup>
                </Field>
                <Button type="submit" colorPalette={'purple'} variant={"solid"}>Add Customer</Button>
            </Stack>
        </form>
    )
}

export default NewClient