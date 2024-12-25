import { Separator, Spinner, VStack } from "@chakra-ui/react"
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
import { BsFillEyeFill } from "react-icons/bs";
import { Button } from "./ui/button";


const ClientProjectInfo = ({ id }: IdClient) => {
    const { data, isLoading} = useGetClientQuery(id, {
        refetchOnMountOrArgChange: true
    })
  return (
    <VStack alignItems="start">
      <DialogRoot placement={'center'} size={'xs'}>
        <DialogTrigger asChild>
            <Button size={'sm'} variant={'subtle'} borderRadius={'full'} fontWeight={'bolder'}>
                {data?.name} <BsFillEyeFill color="gray"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            {isLoading ? (   
                <Spinner color="blackAlpha.800" />)
            :    
          (<>
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
            </>)}
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </VStack>
  )
}

export default ClientProjectInfo