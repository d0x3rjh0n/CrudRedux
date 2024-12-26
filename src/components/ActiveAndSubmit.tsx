import { Grid, GridItem } from '@chakra-ui/react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";

interface Props {
    id: string | undefined
}

const ActiveAndSubmit = ({id}: Props) => {
  return (
    <Grid templateColumns={'repeat(4, 1fr)'} gap={5} w={'full'}>
        <GridItem colSpan={2}>
            <Link to={'/projects'}>
                <Button variant={"subtle"}> <IoArrowBack/> Back</Button>
            </Link>
        </GridItem>
        <GridItem colSpan={2}>
            <Button w={'full'} fontWeight={'bold'} type="submit" variant={'solid'} bg={'blue.700'}>{
                id ? 'Edit project' : 'Add project'}
            </Button>
        </GridItem>
    </Grid>
  )
}

export default ActiveAndSubmit