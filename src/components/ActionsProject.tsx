import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { LuFolderPen } from "react-icons/lu";
import { Tooltip } from "./ui/tooltip";
import { Switch } from "./ui/switch"
import { HiCheck, HiX } from "react-icons/hi"
import { useChangeStatusMutation } from "@/api/endpoints/projectEndpoints";
import { PatchStatusProject } from "@/types";
import { toaster } from "./ui/toaster";
import { Link } from "react-router-dom";
import DialogDelete from "./DialogDelete";

interface Props {
    id: string
    active: boolean
}

const ActionsProject = ({id, active}: Props) => {
    const [ changeStatus ] = useChangeStatusMutation()

    const handleCheck = async () => {
        const newStatus : PatchStatusProject = {
            status : active ? false : true
        }
        if (active) {
            try {
                await changeStatus([id, newStatus])
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                await changeStatus([id, newStatus])
            } catch (error) {
                console.log(error); 
            }
        }
        toaster.create({type: 'info', title: 'New Status', description: 'The new status has been changed'})
    }

  return (
    <Flex flexDirection={'row'}
        justifyContent={'end'} alignItems={'center'}>
        <HStack>
            <Tooltip content={`You can be activate the project with this button`}>
                <IconButton variant={'plain'} onClick={handleCheck}>
                    <Switch checked={active}  thumbLabel={{ on: <HiCheck />, off: <HiX /> }}/>
                </IconButton>
            </Tooltip>
            <Tooltip content={`You can be edit the project with this button`}>
                <Link to={`/editProject/${id}/`}>
                    <IconButton variant={'subtle'} rounded={'full'} size={'lg'}>
                        <LuFolderPen />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip content={`You can be Delete the project with this button`}>
                <DialogDelete object="project" id={id}/>
            </Tooltip>
        </HStack>
    </Flex>
  )
}

export default ActionsProject