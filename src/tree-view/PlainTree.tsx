import { Box, Image } from "../ui.js";
export const PlainTree = () => {
  return (
    <Box
      position="absolute"
      alignItems="center"
      justifyContent="center"
      top="0"
      bottom="0"
      left="0"
      right="0"
      width="100%"
    >
      <Image src="/static/tree.png" height="100%" />
    </Box>
  );
};
