import { Center } from '@chakra-ui/react'

interface Message {
    children: string
}

const NoTableData = ({ children }: Message) => {
    return (
        <Center height={'80%'} color={'gray.400'} fontSize={'2xl'} fontWeight={'light'}>{children}</Center>
    )
}

export default NoTableData