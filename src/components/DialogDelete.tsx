import { IconButton } from "@chakra-ui/react"
import { Button } from "./ui/button"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger,} from "./ui/dialog"
import { MdDelete } from "react-icons/md";
import { IdClient } from '../types'
import { useDeleteClientMutation } from "@/api/endpoints/clientEndpoints";
import { closeModal, openModal } from "@/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { modalSelector } from "@/selectors/modalSelector";
import { toaster } from "./ui/toaster";


const DialogDelete = ({ id }: IdClient) => {
    const [ deleteClient ] = useDeleteClientMutation()
    const dispatch = useDispatch()
    const modalStatus = useSelector(modalSelector)
    const handleDelete = async (id: string) => {   
        try {
            await deleteClient(id).unwrap()
            toaster.create({type: "success", title: 'Successfuly Operation'})
            dispatch(closeModal())
        } catch (error) {
            console.log('Eror => ', error);
        }
    }
    return (
        <DialogRoot open={modalStatus} placement={'center'} role="alertdialog">
            <DialogTrigger asChild>
                <IconButton 
                    onClick={() => dispatch(openModal())}              
                    size={'md'} variant={'ghost'} 
                    rounded={'full'}
                    colorPalette={'gray'} 
                    color={'purple.500'} 
                    aria-label="Delete" 
                    >
                    <MdDelete />
                </IconButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                <p>
                    This action cannot be undone. This will permanently delete this
                    client and remove this data from the system.
                </p>
                </DialogBody>
                <DialogFooter>
                <DialogActionTrigger asChild>
                    <Button variant="outline" onClick={() => dispatch(closeModal())}>Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="red" onClick={() => handleDelete(id)} >Delete</Button>
                </DialogFooter>
                <DialogCloseTrigger onClick={() => dispatch(closeModal())}/>
            </DialogContent>
        </DialogRoot>
    )
}

export default DialogDelete