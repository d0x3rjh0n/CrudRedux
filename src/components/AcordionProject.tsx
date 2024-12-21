import {  Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot,} from "./ui/accordion"
import { Project } from '../types'
import { BiSolidFolderOpen } from "react-icons/bi";
import { ProgressCircleRing, ProgressCircleRoot, ProgressCircleValueText,} from "@/components/ui/progress-circle"
import MyLabel from "./MyLabel";
import { formatDate } from "@/helpers";
import { Status } from "./ui/status";
import FormProjectCell from "./FormProjectCell";

interface AcordionProps {
    project : Project
}

const AcordionProject = ({project}: AcordionProps) => {
  console.log(project);
  
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
              <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
                <FormProjectCell>
                  <MyLabel>{ 'Category'}</MyLabel>
                  {project.categorie}
                </FormProjectCell>
                <FormProjectCell>
                  <MyLabel>{'Priority'}</MyLabel>
                  {project.priority}
                </FormProjectCell>
                <FormProjectCell>
                  <MyLabel>{'Customers Capacity'}</MyLabel>
                  {project.capacity}
                </FormProjectCell>
            </Grid>
            <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
              <FormProjectCell>
                  <MyLabel>{ 'Start Date'}</MyLabel>
                  {formatDate(project.start_date)}
              </FormProjectCell>
              <FormProjectCell>
                  <MyLabel>{'End Date'}</MyLabel>
                  {formatDate(project.end_date)}
              </FormProjectCell>
              <FormProjectCell>
                  <MyLabel>{'Budget'}</MyLabel>
                  {project.budget}
              </FormProjectCell>
            </Grid>
            <Grid templateColumns={'repeat(3,1fr)'} gap={5}>
              <FormProjectCell>
                  <MyLabel>{ 'Status'}</MyLabel>
                  <Status value={project.status === 'false' ? 'error' : 'success'}>{project.status === 'false' ? 'Inactive' : 'Active'}</Status>
              </FormProjectCell>

              <GridItem textAlign={''} colSpan={{base:3, md: 2}}>
                <MyLabel>Progress</MyLabel>
                  <ProgressCircleRoot colorPalette={'blue'} value={5} size={'md'}>
                    <ProgressCircleValueText />
                    <ProgressCircleRing />
                  </ProgressCircleRoot>
              </GridItem>
            </Grid>

            <Box >
              <MyLabel>Cients</MyLabel>
            </Box>

            <Box textWrap={"wrap"}>
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