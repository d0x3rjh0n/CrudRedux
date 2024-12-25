import { Client } from "@/types"
import { CheckboxCard } from "./ui/checkbox-card"
import { add } from "@/slices/clientsSlice"
import { useDispatch, useSelector } from "react-redux"
import { clientsArraySelector } from "@/selectors/clientsArraySelector"

interface Props {
    client : Client
}

const ClientToSelect = ({client} : Props) => {
    const dispatch = useDispatch()
    const ArrayClients = useSelector(clientsArraySelector)
    const isInArray = ArrayClients.some(c => c.id === client.id)
    const handleAdd = () => {
        dispatch(add(client))
    }

  return (
    <CheckboxCard
        defaultChecked={isInArray}
        onChange={() => handleAdd()}
        description={client.email}
        label={client.name}
        colorPalette="green"
        variant={"subtle"}
        cursor={'pointer'}
    />
  )
}

export default ClientToSelect