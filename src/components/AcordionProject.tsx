import { AbsoluteCenter, Box, Button } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "./ui/accordion"
import { Project } from '../types'
import { BiSolidFolderOpen } from "react-icons/bi";

interface AcordionProps {
    project : Project
}

const AcordionProject = ({project}: AcordionProps) => {
  return (
    <AccordionRoot spaceY="4" variant="plain" collapsible defaultValue={["b"]}>
        <AccordionItem key={project.id} value={project.id}>
          <Box position="relative">
            <AccordionItemTrigger>
              <BiSolidFolderOpen/>
              {project.name}
            </AccordionItemTrigger>
            <AbsoluteCenter axis="vertical" insetEnd="0">
              <Button variant="subtle" colorPalette="blue">
                Action
              </Button>
            </AbsoluteCenter>
          </Box>
          <AccordionItemContent>{project.name}</AccordionItemContent>
        </AccordionItem>
    </AccordionRoot>
  )
}

export default AcordionProject