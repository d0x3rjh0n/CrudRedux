
import { Flex } from '@chakra-ui/react'
import NavTabs from "./NavTabs";
import NavDecoration from './NavDecoration';
import NavBreacd from './NavBreacd';


const Header = () => {
    return (
        <Flex
            borderColor={'gray.300'}
            shadow={'2xl'}
            borderBottomRadius={'11px'}
            w={'full'} bg={'whiteAlpha.100'}
            gap={'3'} flexDirection={'column'}
            justifyContent={'center'}
            md={{ flexDirection: 'row', p: '3', justifyContent: 'space-between' }}
            alignItems={'center'}>

            <NavDecoration />

            <Flex gap={'2'} w={'full'} justifyContent={'space-between'} lg={{ flexDirection: 'row', w: '3/5', alignItems: 'center' }} flexDirection={'column'} md={{ alignItems: 'end' }} alignItems={'center'}>
                <NavBreacd />
                <NavTabs />
            </Flex>

        </Flex>
    )
}

export default Header