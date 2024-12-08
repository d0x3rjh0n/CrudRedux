import { Square, Tabs } from "@chakra-ui/react"
import { LuFolder, LuUser } from "react-icons/lu"
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu"
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Link, useLocation } from "react-router-dom";


const NavTabs = () => {
    const location = useLocation()
    return (
        <Tabs.Root defaultValue="members" variant="plain">
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
                <Tabs.Trigger value="clients" asChild disabled={location.pathname === '/'} >
                    <Link to={'/'}> <Square gap={'2'}> <LuUser />Clients</Square></Link>
                </Tabs.Trigger>
                <Tabs.Trigger value="projects" asChild disabled={location.pathname === '/projects'}>
                    <Link to={'/projects'}> <Square gap={'2'}> <LuFolder />Projects </Square> </Link>
                </Tabs.Trigger>
                <Tabs.Trigger asChild value="tasks">
                    <MenuRoot>
                        <MenuTrigger >
                            <Button border={'none'} outline={'none'} asChild variant="plain" size="sm">
                                <Avatar name={'Jhon'} size={'sm'} colorPalette={'purple'} />
                            </Button>
                        </MenuTrigger>
                        <MenuContent>
                            <MenuItem value="rename">Rename</MenuItem>
                            <MenuItem value="export">Export</MenuItem>
                            <MenuItem
                                value="delete"
                                color="fg.error"
                                _hover={{ bg: "bg.error", color: "fg.error" }}
                            >
                                Delete...
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </Tabs.Trigger>
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>
        </Tabs.Root>
    )
}

export default NavTabs