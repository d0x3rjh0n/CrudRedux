import { Heading } from '@chakra-ui/react'

interface Props {
    children: string
}

const MyLabel = ({children}: Props) => {
  return (
    <Heading color={'blackAlpha.700'} fontSize={'md'}>
        {children}
    </Heading>
  )
}

export default MyLabel