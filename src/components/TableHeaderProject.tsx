import { Table } from "@chakra-ui/react"
import { Table as ReactTable } from "@tanstack/react-table"
import { Project } from "@/types"

interface Props {
    table: ReactTable<Project>
}

const TableHeaderProject = ({table}: Props) => {
  return (
    <Table.Header>
        {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <Table.ColumnHeader
                        fontWeight={'bold'}
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
  )
}

export default TableHeaderProject