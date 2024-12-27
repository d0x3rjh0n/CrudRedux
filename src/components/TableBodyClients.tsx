import { Flex, IconButton, Table } from "@chakra-ui/react";
import { Table as ReactTable } from "@tanstack/react-table";
import { Client } from "@/types";
import ClientInfo from "@/components/ClientInfo";
import DialogDelete from "@/components/DialogDelete";
import { Link } from "react-router-dom";
import { BsPersonGear } from "react-icons/bs";
interface Props {
  table: ReactTable<Client>;
}
const TableBodyClients = ({ table }: Props) => {
  return (
    <Table.Body>
      {table.getRowModel().rows.map((row) => (
        <Table.Row fontWeight={"light"} key={row.id}>
          <Table.Cell>{row.original.name}</Table.Cell>
          <Table.Cell>{row.original.email}</Table.Cell>
          <Table.Cell>
            <Flex justifyContent={"end"} gap={"3"}>
              <ClientInfo data={row.original} />
              <Link to={`/editClient/${row.original.id}`}>
                <IconButton
                  color={"blue.800"}
                  size={"md"}
                  variant={"ghost"}
                  colorPalette={"gray"}
                  rounded={"full"}
                >
                  <BsPersonGear />
                </IconButton>
              </Link>
              <DialogDelete object="client" id={row.original.id} />
            </Flex>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default TableBodyClients;
