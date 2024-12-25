import { useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Center, Flex, Heading, Input, Table, Text } from "@chakra-ui/react";
import { InputGroup } from "../components/ui/input-group";
import { IoIosSearch } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import NoTableData from "../components/NoTableData";
//import DialogDelete from "@/components/DialogDelete";
import { EmptyState } from '../components/ui/empty-state'
import { TbFaceIdError } from "react-icons/tb";
import { Spinner, VStack } from "@chakra-ui/react"
import { Button } from "../components/ui/button";
import { MdOutlineFolderOff } from "react-icons/md";
import { useGetProjectsQuery } from "@/api/endpoints/projectEndpoints";
import { Project } from '../types'
import AcordionProject from "@/components/AcordionProject";

const columns = [
    { accessorKey: 'Name', header: 'Name',  },
];

const Projects = () => {
    const [inputFilter, setInputFilter] = useState<string>("")
    const { data: ProjectsData, isLoading: ProjectsLoading} = useGetProjectsQuery()

    const filteredData = useMemo(() => {
        if (inputFilter) {
            return ProjectsData?.filter( (project: Project) => project.name.toLowerCase().includes(inputFilter.toLocaleLowerCase()))
        }
        return ProjectsData
    }, [inputFilter, ProjectsData])

    const table = useReactTable({
        data: filteredData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const renderNoDataMessage = () => {
        if (inputFilter && filteredData?.length === 0) {
            return (
                <NoTableData>
                    <EmptyState
                        size={'lg'}
                        icon={<TbFaceIdError />}
                        title="No results found"
                        description="Try adjusting your search"
                    >
                    </EmptyState>
                </NoTableData>
            );
        }

        if (!ProjectsData || ProjectsData?.length === 0) {
            return <NoTableData>
                    <EmptyState
                        size={'lg'}
                        icon={<MdOutlineFolderOff />}
                        title="You have not added any project"
                        description="Try to add a New Project"
                    >
                    </EmptyState>
                </NoTableData>;
        }
        return null;
    };

    const shouldRenderTableBody = () => {
        const hasFilteredProjects = filteredData && filteredData?.length > 0;
        const hasDataProjects = ProjectsData && ProjectsData?.length > 0;
        return !(inputFilter && !hasFilteredProjects) && (hasDataProjects || hasFilteredProjects);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFilter(e.target.value);
    };

    return (
        <Center py={'14'}>
        <Flex flexDir={'column'} alignItems={'center'} w={'90%'} md={{w : '80%'}} xl={{w : '60%'}} borderWidth="1px" borderRadius=  {'xl'} paddingX={'5'} shadow={'2xl'}>
            <Box w={'full'} mb={'2'} display={'flex'} justifyContent={'space-between'} gap={'2'} alignItems={'center'} mt={'3'}>
                <Heading textAlign={'start'} w={'full'} fontSize={'xl'} color={'blackAlpha.700'}>
                    Projects Content
                </Heading>
                <Link to={'/newProject'}>
                    <Button variant={'solid'} colorPalette={'purple'} size={'xs'} rounded={'full'}><MdCreateNewFolder /> New Project</Button>
                </Link>
            </Box>
            
            <InputGroup w={'full'} flex={'1'} mb={'4'} startElement={<IoIosSearch />}>
                <Input borderRadius={'2xl'} outline={'none'} focusRing={'inside'} focusRingColor={'purple.400'} transition={'all'} placeholder="Search project for name"
                    value={inputFilter}
                    onChange={handleFilterChange}
                />
            </InputGroup>
            <Table.ScrollArea  w={'100%'} md={{ height: '650px'}} height={'450px'}>
                
                <Table.Root w={'100%'} size="sm" variant={"outline"}  borderColor={'gray.100'}>
                    <Table.Header>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Table.ColumnHeader
                                        textAlign={header.id === 'Actions' ? 'center' : 'start'}
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={ header.id === 'Name' ? {width : '45%'} : {}}
                                    >
                                        {header.id}
                                    </Table.ColumnHeader>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Header>

                    {shouldRenderTableBody() ? (
                        <Table.Body>
                            {table.getRowModel().rows.map(row => (
                                <Table.Row key={row.id}>
                                    <Table.Cell >
                                        <AcordionProject project={row.original}/>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    ) : (
                        null
                    )}
                </Table.Root>
                {
                    ProjectsLoading ? (
                            <Center w="full" h="80%">
                                <VStack colorPalette="teal">
                                    <Spinner color="blackAlpha.800" />
                                    <Text color="blackAlpha.800">Loading...</Text>
                                </VStack>
                            </Center>
                        )
                        :
                    renderNoDataMessage()
                }
            </Table.ScrollArea>
        </Flex>
        </Center>

    )
}

export default Projects