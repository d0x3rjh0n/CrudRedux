import { Fragment, useEffect, useState } from "react";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Box, Flex, IconButton, Input, Table } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { InputGroup } from "../components/ui/input-group";
import { IoIosSearch } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { aplyFilter } from "../features/globalFilter";
import { Item } from '../features/globalFilter';
import NoTableData from "../components/NoTableData";

const columns = [
    { accessorKey: 'Id', header: 'Id' },
    { accessorKey: 'Name', header: 'Name' },
    { accessorKey: 'Email', header: 'Email' },
    { accessorKey: 'Actions', header: 'Actions' }
];

const Clients = () => {

    const clients = useSelector((state: RootState) => state.clients.clients as Item[]);
    const filteredClients = useSelector((state: RootState) => state.globalFilter.ArrayFilter as Item[]);

    const [inputFilter, setInputFilter] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(aplyFilter({ ArrayToFilter: clients, globalFilter: inputFilter }));
    }, [inputFilter, clients, dispatch]);

    const table = useReactTable({
        data: filteredClients.length > 0 ? filteredClients : clients,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputFilter(e.target.value);
    };

    const renderNoDataMessage = () => {
        if (inputFilter && filteredClients.length === 0) {
            return <NoTableData>No results found for your search</NoTableData>;
        }

        if (clients.length === 0) {
            return <NoTableData>You have not added any clients</NoTableData>;
        }

        return null;
    };

    const shouldRenderTableBody = () => {
        return !(inputFilter && filteredClients.length === 0) && (clients.length > 0 || filteredClients.length > 0);
    };

    return (
        <Fragment>
            <Box w={'full'} mb={'2'} display={'flex'} justifyContent={'space-between'} gap={'2'} alignItems={'center'}>
                <InputGroup flex={'1'} startElement={<IoIosSearch />}>
                    <Input
                        outline={'none'}
                        focusRing={'inside'}
                        focusRingColor={'purple.400'}
                        transition={'all'}
                        placeholder="Search contacts"
                        value={inputFilter}
                        onChange={handleFilterChange}
                    />
                </InputGroup>
                <Link to={'/newClient'}>
                    <IconButton variant={'solid'} colorPalette={'purple'} size={'lg'} rounded={'full'}><IoMdAdd /></IconButton>
                </Link>
            </Box>

            <Table.ScrollArea borderWidth="1px" maxW="full" height={'450px'}>
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
                                    <Table.Cell textAlign={'center'}>{row.original.id}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>{String(row.original.name)}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>{String(row.original.email)}</Table.Cell>
                                    <Table.Cell textAlign={'center'}>
                                        <Flex justifyContent={'end'} gap={'3'}>
                                            <IconButton size={'2xs'} variant={'ghost'} colorPalette={'gray'} color={'purple.800'} aria-label="View" rounded="full">
                                                <MdRemoveRedEye />
                                            </IconButton>
                                            <IconButton size={'2xs'} variant={'ghost'} colorPalette={'gray'} color={'purple.800'} aria-label="Edit" rounded="full">
                                                <MdModeEditOutline />
                                            </IconButton>
                                            <IconButton size={'2xs'} variant={'ghost'} colorPalette={'gray'} color={'red.500'} aria-label="Delete" rounded="full">
                                                <MdDelete />
                                            </IconButton>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    ) : (
                        null
                    )}
                </Table.Root>
                {renderNoDataMessage()}
            </Table.ScrollArea>
        </Fragment>
    );
};

export default Clients;
