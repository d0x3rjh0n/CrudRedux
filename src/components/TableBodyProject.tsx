import { Table } from "@chakra-ui/react";
import { Table as ReactTable } from "@tanstack/react-table";
import { Project } from "@/types";
import AcordionProject from "./AcordionProject";

interface Props {
  table: ReactTable<Project>;
}
const TableBodyProject = ({ table }: Props) => {
  return (
    <Table.Body>
      {table.getRowModel().rows.map((row) => (
        <Table.Row key={row.id}>
          <Table.Cell>
            <AcordionProject project={row.original} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default TableBodyProject;
