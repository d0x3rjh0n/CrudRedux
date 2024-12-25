import { Center, IconButton, Input, Spinner } from "@chakra-ui/react"
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger} from "./ui/dialog"
import { useGetClientsQuery } from "@/api/endpoints/clientEndpoints";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import ClientToSelect from "./ClientToSelect";
import { InputGroup } from "./ui/input-group";
import { useState } from "react";
import { Client } from "@/types";

const DialogSelectClients = () => {
  const [filter, setFilter] = useState<string>('')
  const {data, isLoading} = useGetClientsQuery()
  const filteredData = data?.filter( (client: Client) => client.name.toLowerCase().includes(filter.toLocaleLowerCase()))
  const noClients = !(data && data?.length > 0)
  const noData = !(filteredData && filteredData.length > 0)

  return (
    <DialogRoot placement={'center'} size={'xs'} scrollBehavior={'inside'}>
      <DialogTrigger asChild>
        <IconButton size={'md'} variant={'ghost'} colorPalette={'gray'} color={'purple.800'} rounded="full">
            <IoMdAdd/>
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        {isLoading 
          ? 
          (<Spinner color="blackAlpha.800" />)
          :    
          (<>
            <DialogHeader>
              <DialogTitle>Prepare Chakra V3</DialogTitle>
            </DialogHeader>
            <DialogBody pb="8" spaceY={2}>
            <InputGroup mb={'1'} startElement={<IoIosSearch />} w={'full'}>
              <Input  size={'xs'} borderRadius={'sm'} outline={'none'} 
              focusRing={'inside'} focusRingColor={'purple.400'} transition={'all'} placeholder="Search client for name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              />
            </InputGroup>
              { noClients ? 
               <Center color={'gray.500'}>There are no customers for add</Center>
               : noData ? 
               <Center color={'gray.500'}>There are no clients with this filter</Center>
               :
                data?.map((client) => (
                  <ClientToSelect key={client.id} client={client}/>
                ))
              }
            </DialogBody>
          </>)
        }
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default DialogSelectClients