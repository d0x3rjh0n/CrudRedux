import { SkeletonText } from "@/components/ui/skeleton";
import { Center } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Center w="full" h="80%"> <SkeletonText noOfLines={10} gap={10}/> </Center>
  )
}

export default LoadingSkeleton