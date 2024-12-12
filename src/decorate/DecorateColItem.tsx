import { Box, Image, Text } from "../ui.js";

interface DecoColItem {
  index: number;
  uri: string;
  price: string;
}
export const DecoColItem = ({ index, uri, price }: DecoColItem) => {
  return (
    <Box
      key={index}
      display="flex"
      flexDirection="column"
      background="background400"
      borderRadius="4"
      gap="8"
      width="128"
      padding="10"
      alignItems="center"
    >
      <Image src={uri} width="36" height="36" />
      <Box
        flexDirection="row"
        gap="6"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          background="gray1000"
          borderRadius="4"
          width="14"
          height="14"
          paddingTop="1"
          paddingLeft="1"
        >
          <Text color="background" align="center" size="10">
            {String(index)}
          </Text>
        </Box>
        <Box marginTop="2">
          <Text color="text" align="center" size="12">
            {+price} XMAS
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
