import { Flex, GridItem, Text } from "@chakra-ui/react"
import MyLabel from "./MyLabel"
import { ReactNode } from "react"
import { StyledBox } from "./AcordionProject"

interface Prop {
  label: string,
  data: string | ReactNode
}

const FormProjectCell = ({ label, data }: Prop) => {
  return (
    <GridItem colSpan={{base:3, md: 1}}>
      <StyledBox>
        <Flex flexDirection={{base: 'row', md: 'column'}} justifyContent={'space-between'} alignItems={{base: 'center', md: 'start'}}>
          <MyLabel>{label}</MyLabel>
          <Text fontWeight={'light'}>{data}</Text>
        </Flex>
        </StyledBox>
    </GridItem>
  )
}

export default FormProjectCell