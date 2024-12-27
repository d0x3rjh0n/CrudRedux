import { IconButton } from "@chakra-ui/react";
import { Button } from "./ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
//import { useDeleteClientMutation } from "@/api/endpoints/clientEndpoints";
import { toaster } from "./ui/toaster";
//import { useDeleteProjectMutation } from "@/api/endpoints/projectEndpoints";
import { BsPersonDash } from "react-icons/bs";
import { useState } from "react";
import { TbFolderX } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { deleteClient } from "@/slices/clientSlice";
import { deleteProject } from "@/slices/projectsSlice";

interface Props {
  id: string;
  object: string;
}

const DialogDelete = ({ id, object }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  //const [deleteClient] = useDeleteClientMutation();
  //const [deleteProject] = useDeleteProjectMutation();
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    try {
      if (object === "client") {
        dispatch(deleteClient(id));
        //await deleteClient(id).unwrap();
      } else {
        dispatch(deleteProject(id));
        //await deleteProject(id).unwrap();
      }
      toaster.create({ type: "success", title: "Successfuly Operation" });
      setOpen(false);
    } catch (error) {
      console.log("Eror => ", error);
    }
  };
  return (
    <DialogRoot open={open} placement={"center"} role="alertdialog">
      <DialogTrigger asChild>
        <IconButton
          onClick={() => setOpen(true)}
          size={"md"}
          variant={"ghost"}
          rounded={"full"}
          colorPalette={"red"}
          color={"red.600"}
          aria-label="Delete"
        >
          {object === "project" ? <TbFolderX /> : <BsPersonDash />}
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete this{" "}
            {object} and remove this data from the system.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={() => setOpen(false)} />
      </DialogContent>
    </DialogRoot>
  );
};

export default DialogDelete;
