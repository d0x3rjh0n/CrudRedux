import { Center, HStack, Square } from "@chakra-ui/react"
import { TbBrandRedux } from "react-icons/tb";
import ReactIcon from "./ReactIcon"
import ViteIcon from "./ViteIcon"
import { Text } from '@chakra-ui/react'
import { SiChakraui } from "react-icons/si";

const NavDecoration = () => {
    return (
        <Center bg={'white'} rounded={'md'} md={{ p: '1' }}>
            <HStack>
                <Square p={'1'} gap={'1'}>
                    <ViteIcon w={18} h={18} />  <Text fontWeight={'bold'}> Vite </Text>
                </Square>

                <Square p={'1'} gap={'1'}>
                    <ReactIcon w={18} h={18} />  <Text fontWeight={'bold'}> React </Text>
                </Square>

                <Square p={'1'} gap={'1'}>
                    <TbBrandRedux color="purple" size={'1.3em'} />  <Text fontWeight={'bold'}> Redux </Text>
                </Square>

                <Square p={'1'} gap={'1'}>
                    <SiChakraui size={'1.3em'} /> <Text fontWeight={'bold'}> Chakra-Ui </Text>
                </Square>
            </HStack>
        </Center>
    )
}

export default NavDecoration