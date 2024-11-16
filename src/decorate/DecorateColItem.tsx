import { Box, Image, Text } from "../ui";

interface DecoColItem {
  index: number;
  priceUnit: number;
  uri: string;
}
export const DecoColItem = ({ index, uri, priceUnit }: DecoColItem) => {
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
      {/* <Box alignItems="center" justifyContent="center" margin="4">
        <Text color="text" align="center" size="12">
          {String(index)}
        </Text>
      </Box> */}
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
            {String(priceUnit * 0.005)} ETH
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
