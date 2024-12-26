import { IconButton, Separator, Spinner, VStack } from "@chakra-ui/react"
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
      <DialogRoot size={'xs'} placement={'center'}>
        <DialogTrigger asChild>
          <IconButton 
              size={'sm'} 
              variant={'ghost'} 
              colorPalette={'gray'} 
              color={'gray.400'} 
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
                <DialogTitle>Client Information</DialogTitle>
            </DialogHeader>
            <DialogBody pb="8">
                <DataListRoot orientation="horizontal">
                <DataListItem label="Name" value={data?.name}/>
                <Separator/>
                <DataListItem label="Age" value={data?.age} />
                <Separator/>
                <DataListItem label="Email" value={data?.email} />
                <Separator/>
                <DataListItem label="Phone" value={data?.phone} />
                <Separator/>
                </DataListRoot>
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