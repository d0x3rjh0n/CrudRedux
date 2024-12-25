import { Flex, GridItem } from "@chakra-ui/react"
import MyLabel from "./MyLabel"
import { ReactNode } from "react"

interface Prop {
  label: string,
  data: string | ReactNode
}

const FormProjectCell = ({ label, data }: Prop) => {
  return (
    <GridItem colSpan={{base:3, md: 1}}>
        <Flex flexDirection={{base: 'row', md: 'column'}} justifyContent={'space-between'} alignItems={{base: 'center', md: 'start'}}>
          <MyLabel>{label}</MyLabel>
          {data}
        </Flex>
    </GridItem>
  )
}

export default FormProjectCell