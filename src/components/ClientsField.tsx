import DialogSelectClients from "@/components/DialogSelectClients"
import { Box, Flex } from "@chakra-ui/react";
import { Field } from "./ui/field";
import MyLabel from "./MyLabel";
import { Tag } from "./ui/tag";
import { clientsArraySelector } from "@/selectors/clientsArraySelector";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/slices/clientsSlice";

const ClientsField = () => {
  const clientsSelect = useSelector(clientsArraySelector)
  const dispatch = useDispatch()
  return (
    <Box spaceY={1}>
        <Flex>
            <Field label={<MyLabel>Clients</MyLabel>}/>
            <DialogSelectClients/>
        </Flex>

        <Flex w={'full'} border={'1px solid'} p={'5'} borderColor={'gray.200'} borderRadius={'md'} flexWrap={'wrap'} gap={4}>
          {clientsSelect.map(client => (
            <Tag closable key={client.id} size={'lg'} borderRadius={'full'} onClick={() => dispatch(add(client))}>
                {client.name}
            </Tag>
          ))}
        </Flex>
    </Box>
  )
}

export default ClientsField