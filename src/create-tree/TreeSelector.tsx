import { Box, Image } from "../ui";

interface TreeSelectorProps {
  no: number;
}
export const TreeSelector = ({ no }: TreeSelectorProps) => {
  return (
    <Box
      position="absolute"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      // background="text100"
    >
      <Box marginTop="32" borderRadius="16" width="192" height="192" background="background200">
        {no && (
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            right="0"
          >
            <Image borderRadius="16" src={`/bg/bg-${no}.png`} />
          </Box>
        )}
        <Image src="/tree.png" height="100%" />
      </Box>
    </Box>
  );
};
