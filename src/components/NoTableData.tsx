import { Center } from '@chakra-ui/react';
import { EmptyState } from './ui/empty-state';
import { IconType } from 'react-icons/lib';

interface Message {
    Icon: IconType
    title: string
    description: string
}

const NoTableData = ({ Icon, title, description }: Message) => {
    return (
        <Center height={'100%'} color={'gray.400'} fontSize={'2xl'} fontWeight={'light'}>
            <EmptyState size={'lg'} icon={<Icon />} title={title}  description={description}/>    
        </Center>
    );
};

export default NoTableData;
