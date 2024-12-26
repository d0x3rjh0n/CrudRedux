import { Table } from "@chakra-ui/react"
import { Table as ReactTable} from '@tanstack/react-table'
import { Client } from "@/types"
import React from "react"

interface Props {
    table: ReactTable<Client>
}

const TableHeaderClient = React.memo(({table}: Props) => {
  return (
    <Table.Header>
        {table.getHeaderGroups().map(headerGroup => (
            <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <Table.ColumnHeader fontWeight={'bold'} textAlign={header.id === 'Actions' ? 'center' : 'start'} key={header.id}
                        style={ header.id === 'Name' ? {width : '45%'} : 
                                header.id === 'Email' ? {width : '45%'} : 
                                header.id === 'Actions' ? { width: '10%' } : 
                                {}}>
                        {header.id}
                    </Table.ColumnHeader>
                ))}
            </Table.Row>
        ))}
    </Table.Header>
  )
})

export default TableHeaderClient