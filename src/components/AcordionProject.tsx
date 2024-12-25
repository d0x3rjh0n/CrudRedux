import {  Box, Center, Flex, Grid, GridItem, Input, Separator } from "@chakra-ui/react"
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot,} from "./ui/accordion"
import { Project } from '../types'
import { BiSolidFolderOpen } from "react-icons/bi";
import { ProgressCircleRing, ProgressCircleRoot, ProgressCircleValueText,} from "@/components/ui/progress-circle"
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

export const StyledBox = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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
        <AccordionItem key={project.id} value={project.id} p={3}>
          <Box position="relative">
            <AccordionItemTrigger>
              <BiSolidFolderOpen/>
              {project.name}
            </AccordionItemTrigger>
          </Box>
          <AccordionItemContent>
            <Flex flexDirection={'column'} gap={5}>
              <ActionsProject id={project.id} active={project.status}/>
              <StyledBox spaceY={5}>
                <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                  <FormProjectCell label="Categorie" data={project.categorie}/>
                  <FormProjectCell label="Priority" data={project.priority}/>
                  <FormProjectCell label="Capacity" data={String(project.capacity)}/>
                </Grid>
                <Separator/>
                <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                 
                  <FormProjectCell label="Status" 
                    data={<Status value={project.status ? 'success' : 'error' }>{project.status ? 'Active' : 'Inactive' }</Status>}
                  />     
                </Grid>
              </StyledBox>

              <StyledBox spaceY={5}>
                <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                  <GridItem colSpan={{base:3, md: 1}}>
                  <FormProjectCell label="Budget" data={project.budget}/>
                  </GridItem>   
                  <GridItem colSpan={{base:3, md: 2}} display={'flex'} w={'full'} alignItems={'center'}>
                      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2} w='full'>
                        <MyLabel>Progress</MyLabel>
                        <Separator/>
                        <ProgressCircleRoot colorPalette={'blue'} value={project.progress} size={'md'}>
                          <ProgressCircleValueText />
                          <ProgressCircleRing />
                        </ProgressCircleRoot>
                        <Separator/>
                        <DialogProgress id={project.id}/>
                      </Flex>
                  </GridItem>
                </Grid>
              </StyledBox>
              
              <StyledBox spaceY={5}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <MyLabel>Clients</MyLabel>
                  <InputGroup mb={'1'} startElement={<IoIosSearch />}>
                    <Input size={'xs'} borderRadius={'sm'} outline={'none'} 
                    focusRing={'inside'} focusRingColor={'purple.400'} transition={'all'} placeholder="Search client for name"
                    value={filter}
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
                  {String(project.description)}
              </Box>
            </Flex>
          </AccordionItemContent>

        </AccordionItem>
    </AccordionRoot>
  )
}

export default AcordionProject