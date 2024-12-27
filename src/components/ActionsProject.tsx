import { Flex, IconButton } from "@chakra-ui/react";
import { LuFolderPen } from "react-icons/lu";
import { Tooltip } from "./ui/tooltip";
import { Switch } from "./ui/switch";
import { HiCheck, HiX } from "react-icons/hi";
import { toaster } from "./ui/toaster";
import { Link } from "react-router-dom";
import DialogDelete from "./DialogDelete";
import { activateProject } from "@/slices/projectsSlice";
import { useDispatch } from "react-redux";

interface Props {
  id: string;
  active: boolean;
}

const ActionsProject = ({ id, active }: Props) => {
  //const [changeStatus] = useChangeStatusMutation();
  const dispatch = useDispatch();
  const handleCheck = async () => {
    const newStatus = active ? false : true;
    dispatch(activateProject([id, newStatus]));
    toaster.create({
      type: "info",
      title: "New Status",
      description: "The new status has been changed",
    });
  };

  return (
    <Flex
      flexDirection={{ base: "row", md: "column" }}
      justifyContent={"space-between"}
      alignItems={{ base: "center", md: "start" }}
    >
      <Flex w={"full"} justifyContent={"space-around"}>
        <Tooltip content={`You can be activate the project with this button`}>
          <IconButton
            colorPalette={"green"}
            variant={"plain"}
            rounded={"full"}
            size={"sm"}
            onClick={handleCheck}
          >
            <Switch
              checked={active}
              size={"md"}
              thumbLabel={{ on: <HiCheck />, off: <HiX /> }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip content={`You can be edit the project with this button`}>
          <Link to={`/editProject/${id}/`}>
            <IconButton
              variant={"ghost"}
              colorPalette={"blue"}
              rounded={"full"}
              size={"md"}
            >
              <LuFolderPen />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip content={`You can be Delete the project with this button`}>
          <DialogDelete object="project" id={id} />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default ActionsProject;
