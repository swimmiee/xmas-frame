import { Box, Image } from "../ui";

interface TreeBackgroundProps {
  no: number;
}
export const TreeBackground = ({ no }: TreeBackgroundProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      position="absolute"
      alignItems="center"
      justifyContent="center"
    >
      {no && <Image src={`/bg/bg-${no}.png`} height="100%" />}
    </Box>
  );
};
