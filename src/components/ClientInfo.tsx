import { IconButton, Separator, VStack } from "@chakra-ui/react";
import { MdRemoveRedEye } from "react-icons/md";
import { DataListItem, DataListRoot } from "./ui/data-list";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Client } from "@/types";

interface Props {
  data: Client;
}
const ClientInfo = ({ data }: Props) => {
  return (
    <VStack alignItems="start">
      <DialogRoot size={"xs"} placement={"center"}>
        <DialogTrigger asChild>
          <IconButton
            size={"sm"}
            variant={"ghost"}
            colorPalette={"gray"}
            color={"gray.400"}
            aria-label="View"
            rounded="full"
          >
            <MdRemoveRedEye />
          </IconButton>
        </DialogTrigger>
        <DialogContent>
          {
            <>
              <DialogHeader>
                <DialogTitle>Client Information</DialogTitle>
              </DialogHeader>
              <DialogBody pb="8">
                <DataListRoot orientation="horizontal">
                  <DataListItem label="Name" value={data?.name} />
                  <Separator />
                  <DataListItem label="Age" value={data?.age} />
                  <Separator />
                  <DataListItem label="Email" value={data?.email} />
                  <Separator />
                  <DataListItem label="Phone" value={data?.phone} />
                  <Separator />
                </DataListRoot>
              </DialogBody>
            </>
          }
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </VStack>
  );
};

export default ClientInfo;
