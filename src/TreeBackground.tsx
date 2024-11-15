import { Box, Image } from "./ui";

interface TreeBackgroundProps {
  no: number;
}
export const TreeBackground = ({ no }: TreeBackgroundProps) => {
  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      top="0"
      bottom="0"
      left="0"
      right="0"
    >
      <Image src={`/bg/bg-${no}.png`} width="100%" height="100%" />
    </Box>
  );
};
