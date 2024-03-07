import { Box, type BoxProps, useColorModeValue } from '@/ui';

export const CardContainer = (props: BoxProps) => (
  <Box rounded="lg" boxShadow="lg" bg={useColorModeValue('white', 'gray.700')} p={{ base: 4, sm: 8 }} {...props} />
);
