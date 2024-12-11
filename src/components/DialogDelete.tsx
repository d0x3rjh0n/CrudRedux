import { IconButton } from "@chakra-ui/react"
import { Button } from "./ui/button"
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger,} from "./ui/dialog"
import { MdDelete } from "react-icons/md";
//import { useDispatch } from "react-redux";
import { Id } from '../types'



const DialogDelete = ({ id }: Id) => {

    //const dispatch = useDispatch()
    
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        console.log(id);
        e.preventDefault()
    }

    return (
        <DialogRoot placement={'center'} role="alertdialog">
        <DialogTrigger asChild>
            <IconButton               
                size={'2xs'} variant={'ghost'} 
                colorPalette={'gray'} 
                color={'red.500'} 
                aria-label="Delete" 
                rounded="full">
                <MdDelete />
            </IconButton>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <DialogBody>
            <p>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our systems.
            </p>
            </DialogBody>
            <DialogFooter>
            <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button colorPalette="red" onClick={e => handleDelete(e, id)} >Delete</Button>
            </DialogFooter>
            <DialogCloseTrigger />
        </DialogContent>
        </DialogRoot>
    )
}

export default DialogDelete