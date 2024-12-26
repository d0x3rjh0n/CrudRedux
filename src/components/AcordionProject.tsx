import {  Box, Center, Flex, Grid, GridItem, HStack, Input, Text } from "@chakra-ui/react"
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot,} from "./ui/accordion"
import { Project } from '../types'
import { BiSolidFolderOpen } from "react-icons/bi";
import MyLabel from "./MyLabel";
import { Status } from "./ui/status";
import FormProjectCell from "./FormProjectCell";
import { InputGroup } from "./ui/input-group";
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components'
import ActionsProject from "./ActionsProject";
import ClientProjectInfo from "./ClientProjectInfo";
import { useMemo, useState } from "react";
import { Client } from "../types";
import DialogProgress from "./DialogProgress";

import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress"

export const StyledBox = styled(Box)`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 6px;
`

interface AcordionProps {
    project : Project
}

const AcordionProject = ({project}: AcordionProps) => {
  const [filter, setFilter] = useState<string>('')
  const filteredClients = useMemo(() => {
    if (filter) {
      return project.clients.filter( (client: Client) => client.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }
    return project.clients
  }, [project.clients, filter])

  const noClients = !(project.clients && project.clients.length > 0)
  const noData = !(filteredClients && filteredClients.length > 0)

  return (
    <AccordionRoot spaceY="4" variant="subtle" collapsible defaultValue={["b"]}>
        <AccordionItem key={project.id} value={project.id}>
          <Box position="relative">
            <AccordionItemTrigger>
              <BiSolidFolderOpen/>
              {project.name}
            </AccordionItemTrigger>
          </Box>
          <AccordionItemContent>
            <Flex flexDirection={'column'} gap={5}>
              <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                <GridItem colSpan={{base:3, md: 1}}>
                  <StyledBox>
                    <ActionsProject id={project.id} active={project.status}/>
                  </StyledBox>
                </GridItem>
                <FormProjectCell label="Categorie" data={project.categorie}/>
                <FormProjectCell label="Priority" data={project.priority}/>
              </Grid>
                
              <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                <FormProjectCell label="Capacity" data={String(project.capacity)}/>
                <FormProjectCell label="Status" 
                  data={<Status value={project.status ? 'success' : 'error' }>{project.status ? 'Active' : 'Inactive' }</Status>}
                />     
                <FormProjectCell label="Budget" data={`$${project.budget}`}/>  
              </Grid>
        
              <StyledBox spaceY={5}>
                <ProgressRoot colorPalette={'blue'} value={project.progress} maxW="full">
                  <HStack gap="5">
                    <ProgressLabel>Progress</ProgressLabel>
                    <ProgressBar flex="1" />
                    <ProgressValueText>{project.progress}%</ProgressValueText>
                    <DialogProgress id={project.id}/>
                  </HStack>
                </ProgressRoot>
              </StyledBox>

              <StyledBox>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <MyLabel>Clients</MyLabel>
                  <InputGroup mb={'1'} startElement={<IoIosSearch />}>
                    <Input outline={'none'} border={'1px solid'} borderColor={'gray.200'} transition={'all'} _focus={{shadow: 'lg'}} focusRing={'inside'} focusRingColor={'blue.600'} placeholder="Search client for name"
                    value={filter} size={'xs'}
                    onChange={(e) => setFilter(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
                {
                  noClients ? 
                    <Center color={'gray.500'}>There are no associated customers</Center>
                  : noData ? 
                    <Center color={'gray.500'}>There are no clients with this filter</Center>
                  :                
                    <Flex w={'full'} flexWrap={'wrap'} gap={4}>
                      {filteredClients?.map(client => (
                        <ClientProjectInfo key={client.id} id={client.id}/>
                      ))}
                    </Flex>
                  }
              </StyledBox>
              <Box textWrap={"wrap"} bg={'white'} spaceY={2} p={5} borderRadius={'md'} shadow={'sm'} w={'full'}>
                <MyLabel>{ 'Description'}</MyLabel>
                  <Text fontWeight={'light'}>{String(project.description)}</Text>
              </Box>
            </Flex>
          </AccordionItemContent>
        </AccordionItem>
    </AccordionRoot>
  )
}

export default AcordionProject