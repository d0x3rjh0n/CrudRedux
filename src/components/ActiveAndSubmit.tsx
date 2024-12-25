import { Grid, GridItem } from '@chakra-ui/react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const ActiveAndSubmit = () => {
  return (
    <Grid templateColumns={'repeat(4, 1fr)'} gap={5}>
        <GridItem colSpan={{ base: 4, md: 2 }}>
            <Link to={'/projects'}>
                Back
            </Link>
        </GridItem>

        <GridItem colSpan={{ base: 4, md: 2 }}>
            <Button w={'full'} type="submit" variant={'solid'}>
                Add Project
            </Button>
        </GridItem>
    </Grid>
  )
}

export default ActiveAndSubmit