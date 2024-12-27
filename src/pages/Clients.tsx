import { useEffect, useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Flex, Table } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { BsPersonAdd } from "react-icons/bs";
import NoTableData from "../components/NoTableData";
//import { useGetClientsQuery } from "@/api/endpoints/clientEndpoints";
import { Client } from "../types";
import { TbFaceIdError } from "react-icons/tb";
import { MdPersonOff } from "react-icons/md";
//import DesconectionAlert from "@/components/DesconectionAlert";
import { shouldRenderTableBody } from "../helpers";
import TableHeaderClient from "@/components/TableHeaderClient";
import TableBodyClients from "@/components/TableBodyClients";
import { setClients, resetPage } from "@/slices/paginationClientsSlice";
import { paginationClientSelector } from "@/selectors/pagClientSelector";
import { useDispatch, useSelector } from "react-redux";
import TableLayout from "@/components/TableLayout";
//import LoadingSkeleton from "@/components/LoadingSkeleton";
import Pagination from "@/components/PaginationComponent";
import { clientSelector } from "@/selectors/clientSelector";
import { loadStorageClient } from "@/slices/clientSlice";

const columns = [
  { accessorKey: "Name", header: "Name" },
  { accessorKey: "Email", header: "Email" },
  { accessorKey: "Actions", header: "Actions" },
];

const Clients = () => {
  const [inputFilter, setInputFilter] = useState<string>("");
  const { arrayClients: DataClient } = useSelector(clientSelector);
  //const { data: DataClient = [], isLoading: ClientLoading, error: ClientError } = useGetClientsQuery();
  const { clients, currentPage, pageSize, count } = useSelector(
    paginationClientSelector
  );

  const dispatch = useDispatch();
  const startRange = (currentPage - 1) * pageSize;
  const endRange = startRange + pageSize;
  const isPaginated = DataClient.length > pageSize;
  const sessionClients = localStorage.getItem("clients");

  useEffect(() => {
    if (sessionClients) {
      const parsedClients = JSON.parse(sessionClients);
      dispatch(loadStorageClient(parsedClients));
    } else {
      localStorage.setItem("clients", JSON.stringify([]));
    }
    dispatch(resetPage());
  }, [dispatch, sessionClients]);

  useMemo(() => {
    if (DataClient.length > 0) {
      localStorage.setItem("clients", JSON.stringify(DataClient));
    }
  }, [DataClient]);

  useEffect(() => {
    dispatch(setClients(DataClient));
  }, [DataClient, dispatch]);

  const paginateData = useMemo(
    () => clients.slice(startRange, endRange),
    [clients, endRange, startRange]
  );

  const filteredData = useMemo(() => {
    const dataToFilter = inputFilter ? clients : paginateData;
    return dataToFilter.filter((client: Client) =>
      client.name.toLowerCase().includes(inputFilter.toLocaleLowerCase())
    );
  }, [inputFilter, clients, paginateData]);

  const table = useReactTable({
    data: filteredData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter(e.target.value);
  };

  const renderNoDataMessage = () => {
    if (inputFilter && filteredData?.length === 0) {
      return (
        <NoTableData
          title="No results found"
          description="Try adjusting your search"
          Icon={TbFaceIdError}
        />
      );
    }
    if (!DataClient || DataClient?.length === 0) {
      return (
        <NoTableData
          Icon={MdPersonOff}
          title="You have not added any clients"
          description="Try to add a new Client"
        />
      );
    }
    return null;
  };

  //if (ClientError) return <DesconectionAlert/>

  return (
    <TableLayout
      LinkIcon={BsPersonAdd}
      SearchIcon={IoIosSearch}
      handleFilterChange={handleFilterChange}
      heading="Clients Content"
      linkName="New Client"
      linkPath="/newClient"
      searchValue={inputFilter}
      placeholder="client"
    >
      {shouldRenderTableBody(filteredData, DataClient, inputFilter) ? (
        <Flex
          flexDirection={"column"}
          h={"full"}
          justifyContent={"space-between"}
        >
          <Table.Root
            w={"100%"}
            size="sm"
            variant={"outline"}
            borderColor={"gray.100"}
          >
            <TableHeaderClient table={table} />
            <TableBodyClients table={table} />
          </Table.Root>
          {!inputFilter && isPaginated && (
            <Pagination
              count={count}
              page={currentPage}
              pageSize={pageSize}
              value="clients"
            />
          )}
        </Flex>
      ) : (
        renderNoDataMessage()
      )}
    </TableLayout>
  );
};

export default Clients;
