import { Badge, IconButton, Spinner, Textarea, VStack } from "@chakra-ui/react"
import { MdRemoveRedEye } from "react-icons/md";
import { DataListItem, DataListRoot } from "./ui/data-list"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { IdClient } from '../types/'
import { useGetClientQuery } from "@/api/endpoints/clientEndpoints";

const ClientInfo = ({ id }: IdClient) => {
    const { data, isLoading} = useGetClientQuery(id, {
        refetchOnMountOrArgChange: true
    })
  return (
    <VStack alignItems="start">
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>
        <IconButton 
            size={'md'} 
            variant={'ghost'} 
            colorPalette={'gray'} 
            color={'purple.800'} 
            aria-label="View" 
            rounded="full">
            <MdRemoveRedEye />
        </IconButton>
        </DialogTrigger>
        <DialogContent>
            {isLoading ? (   
                <Spinner color="blackAlpha.800" />)
            :    
          (
            <>
            <DialogHeader>
                <DialogTitle>Prepare Chakra V3</DialogTitle>
            </DialogHeader>
            <DialogBody pb="8">
                <DataListRoot orientation="horizontal">
                <DataListItem
                    label="Status"
                    value={<Badge colorPalette="green">Completed</Badge>}
                />
                <DataListItem
                    label="Name"
                    value={data?.name}
                />
                <DataListItem label="Age" value={data?.age} />
                <DataListItem label="Email" value={data?.email} />
                <DataListItem label="Phone" value={data?.phone} />
                </DataListRoot>
                <Textarea placeholder="Add a note" mt="8" />
            </DialogBody>
            </>
          )
           }
          <DialogCloseTrigger />

        </DialogContent>
      </DialogRoot>
    </VStack>
  )
}

export default ClientInfo