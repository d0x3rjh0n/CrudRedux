import { Flex, Heading,Icon,Text  } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <Flex p={10} gap={5} bg={"blackAlpha.800"} flexDirection={{base: 'column', md: 'row'}} justifyContent={{base: 'center', md: 'space-evenly'}} alignItems={'center'}>
      <Flex gap={3} alignItems={'center'} flexDirection={{base: 'column', md: 'row'}}>
        <Heading fontSize={{base: '3xl', md: '4xl'}} color={'white'} fontWeight={'black'}>CrudRedux</Heading>  
        <Flex w={'sm'} flexDirection={{base: 'row'}} justifyContent={'center'} gap={3} color={'white'} textDecor={'underline'}>
            <Link to={'/projects'}>Projects</Link>
            <Link to={'/newProject'}>New project</Link>
            <Link to={'/'}>Clients</Link>
            <Link to={'/newClient'}>New client</Link>
        </Flex>
      </Flex>
      <Flex w={'sm'} flexDirection={{base: 'column'}} alignItems={{base: 'center', md: 'start'}} justifyContent={'center'} gap={3}>
          <Flex w={'sm'} flexDirection={{base: 'row'}} alignItems={'center'} justifyContent={{base: 'center', md: 'start'}} gap={3}>
            <Icon fontSize={'2xl'} color={'white'}><FaTwitter/></Icon>
            <Icon fontSize={'2xl'} color={'white'}><FaYoutube/></Icon>
            <Icon fontSize={'2xl'} color={'white'}><FaFacebookMessenger/></Icon>
            <Icon fontSize={'2xl'} color={'white'}><RiInstagramFill/></Icon>
          </Flex>
          <Text color={'white'} fontWeight={'light'}>&copy; d3veloperjh0n@gmail.com. All rights reserved</Text>
        </Flex>

      
    </Flex>
  )
}

export default Footer