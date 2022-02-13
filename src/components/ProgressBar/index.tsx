import { Box, keyframes } from "@chakra-ui/react"

const slightlyMove = keyframes`
  0% {transform: translateX(-1px);}
  50% {transform: translateX(0px);}
  100% {transform: translateX(1px)}
`;

const slightlyMoveAnimation = `${slightlyMove} infinite 2s ease`

const ProgressBar = ({ current, total }: { current: number; total: number}) => {

  const progress = current / total * 100
  return (
   <Box width="100%" height="5" bg="gray.100" borderRadius="md" position="relative" overflow="hidden">
      <Box position="absolute" bg="orange.400" top="0" left="0" width={`${progress}%`} height="100%" animation={slightlyMoveAnimation}></Box>
   </Box>
  )
}
export default ProgressBar
