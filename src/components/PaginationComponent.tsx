import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "@/components/ui/pagination"
import { setPage as spc } from "@/slices/paginationClientsSlice"
import { setPage as spp} from "@/slices/paginationProjectSlice"
import { HStack } from "@chakra-ui/react"
import { useDispatch } from "react-redux"

interface Props {
    page: number
    count: number
    pageSize: number
    value: string
}

const PaginationComponent = ({page, count, pageSize, value}: Props) => {
    const dispatch = useDispatch()
    const hanlePageChange = (page: number) => {
        if (value === 'clients') {
            dispatch(spc(page))
        }else if(value === 'projects'){
            dispatch(spp(page))
        }
    }
  return (
    <PaginationRoot
        page={page}
        count={count}
        pageSize={pageSize}
        onPageChange={e => hanlePageChange(e.page)}
        variant="subtle"
    >
        <HStack>
        <PaginationPrevTrigger />
        <PaginationItems/>
        <PaginationNextTrigger />
        </HStack>
    </PaginationRoot>
  )
}

export default PaginationComponent