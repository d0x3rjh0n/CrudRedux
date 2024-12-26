import { Flex } from '@chakra-ui/react'
import { Tabs } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu"
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { MdInfoOutline } from "react-icons/md";
import { toaster } from './ui/toaster'

const Header = () => {
    const location = useLocation()
    const activateTab = location.pathname === '/projects' ? 'projects' : 'clients'
    return (
        <Flex w={{base: '90%', md: '80%', xl: '60%'}} justifyContent={'space-between'} alignItems={'center'}>
            <Tabs.Root  defaultValue={activateTab} variant="plain">
                <Tabs.List shadow={'md'} bg="bg.muted" rounded="l3" p="1">
                    <Tabs.Trigger asChild value="clients">
                        <Link to={'/'}>
                            <LuUser />
                            Clients
                        </Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger asChild value="projects">
                        <Link to={'/projects'}>
                        <LuFolder />
                        Projects
                        </Link>
                    </Tabs.Trigger>
                <Tabs.Indicator rounded="l2" />
                </Tabs.List>
            </Tabs.Root>
            <Button variant={'plain'} onClick={() => {
                toaster.success({
                    title: 'Hello friend :)',
                    description: "Contact me to get a quality software",
                })
            }}>
                <MdInfoOutline/>
            </Button>
        </Flex>
    )
}

export default Header