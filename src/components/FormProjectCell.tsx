import { Flex, GridItem } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Prop {
  children : ReactNode
}

const FormProjectCell = ({children}: Prop) => {
  return (
    <GridItem colSpan={{base:3, md: 1}}>
        <Flex flexDirection={{base: 'row', md: 'column'}} justifyContent={'space-between'}>
            {children}
        </Flex>
    </GridItem>
  )
}

export default FormProjectCell