import { UseFormRegister } from "react-hook-form"
import { FormValues } from "@/pages/NewProject"
import { Input } from "@chakra-ui/react"
import { ElementType } from "react"
import { InputGroup } from "./ui/input-group"

interface Props {
    register: UseFormRegister<FormValues>
    value: keyof FormValues
    element: ElementType
}
const InputProject = ({register, value, element : Element}: Props) => {
  return (
    <InputGroup flex={'1'} startElement={<Element size={'1.2em'} />} w={'full'}>
        <Input 
        outline={'none'} 
        border={'1px solid'} 
        borderColor={'gray.200'} 
        transition={'all'} 
        _focus={{shadow: 'lg'}}
        focusRing={'inside'} 
        focusRingColor={'blue.600'} 
        size={'md'} 
        autoComplete="off" 
        {...register(value)} 
        />
    </InputGroup>
  )
}

export default InputProject