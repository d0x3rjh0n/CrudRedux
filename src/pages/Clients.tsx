import { Fragment, useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Center, Flex, Heading, IconButton, Input, Table, Text } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { InputGroup } from "../components/ui/input-group";
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import NoTableData from "../components/NoTableData";
import DialogDelete from "@/components/DialogDelete";
import { useGetClientsQuery } from "@/api/endpoints/clientEndpoints";
import { Client } from "../types";
import { EmptyState } from '../components/ui/empty-state'
import { TbFaceIdError } from "react-icons/tb";
import { Spinner, VStack } from "@chakra-ui/react"


const columns = [
    { accessorKey: 'Name', header: 'Name' },
    { accessorKey: 'Email', header: 'Email' },
    { accessorKey: 'Phone', header: 'Phone' },
    { accessorKey: 'Actions', header: 'Actions' }
];

const Clients = () => {
    const { data: DataClient = [], isLoading: ClientLoading, error: ClientError } = useGetClientsQuery();
    const [inputFilter, setInputFilter] = useState<string>("");
    
    const filteredData = useMemo(() => {
        if (inputFilter) {
            return DataClient?.filter( (client : Client) => client.name.toLowerCase().includes(inputFilter.toLocaleLowerCase()))
        }
        return DataClient
    }, [inputFilter, DataClient])

    const table = useReactTable({
        data: filteredData || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFilter(e.target.value);
    };

    const renderNoDataMessage = () => {
        if (inputFilter && filteredData.length === 0) {
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
        
        if (!DataClient || DataClient.length === 0) {
            return <NoTableData>You have not added any clients</NoTableData>;
        }
        return null;
    };

    const shouldRenderTableBody = () => {
        const hasFilteredClients = filteredData && filteredData.length > 0;
        const hasDataClients = DataClient && DataClient.length > 0;
        return !(inputFilter && !hasFilteredClients) && (hasDataClients || hasFilteredClients);
    };

    if (ClientError) return <p>Error loading clients</p>;

    return (
        <Fragment>
            <Heading textAlign={'center'} fontSize={'3xl'} p={'4'} color={'blackAlpha.700'}>
                Clients table
            </Heading>
            <Box w={'full'} mb={'2'} display={'flex'} justifyContent={'space-between'} gap={'2'} alignItems={'center'}>

                <InputGroup flex={'1'} startElement={<IoIosSearch />}>
                    <Input
                        outline={'none'}
                        focusRing={'inside'}
                        focusRingColor={'purple.400'}
                        transition={'all'}
                        placeholder="Search clients for name"
                        value={inputFilter}
                        onChange={handleFilterChange}
                    />
                </InputGroup>
                <Link to={'/newClient'}>
                    <IconButton variant={'solid'} colorPalette={'purple'} size={'lg'} rounded={'full'}><IoMdAdd /></IconButton>
                </Link>
                
            </Box>

            <Table.ScrollArea borderWidth="1px" w="full" md={{ height: '650px'}} height={'450px'}>
                
                <Table.Root w={'100%'} size="md" border={'solid 1px'} shadow={'md'} borderColor={'gray.200'} borderRadius={'md'}>
                    <Table.Header>
                        {table.getHeaderGroups().map(headerGroup => (
                            <Table.Row key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <Table.ColumnHeader
                                        textAlign={header.id === 'Actions' ? 'end' : 'center'}
                                        key={header.id}
                                        colSpan={header.colSpan}
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
                                    <Table.Cell textAlign={'center'}>{row.original.name}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>{row.original.email}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>{row.original.phone}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Flex justifyContent={'end'} gap={'3'}>
                                            <IconButton 
                                                size={'2xs'} 
                                                variant={'ghost'} 
                                                colorPalette={'gray'} 
                                                color={'purple.800'} 
                                                aria-label="View" 
                                                rounded="full">
                                                <MdRemoveRedEye />
                                            </IconButton>
                                            <IconButton size={'2xs'} 
                                            variant={'ghost'} 
                                            colorPalette={'gray'} 
                                            color={'purple.800'} 
                                            aria-label="Edit" 
                                            rounded="full">
                                                <MdModeEditOutline />
                                            </IconButton>
                                            <DialogDelete id={row.original.id}/>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    ) : (
                        null
                    )}
                </Table.Root>
                {ClientLoading ? (
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
        </Fragment>
    );
};

export default Clients;
