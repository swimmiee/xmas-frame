import PATH from "../routes/path";
import { Button, FrameHandler, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { Box, Text, Image } from "../ui";
import { EnvState } from "..";
import { formatEther, parseEther } from "ethers";
import { getUniRouter } from "../contracts/UniRouter";
import { CONFIGS } from "../configs";
import { getXMAS } from "../contracts/XMAS";
import { provider } from "../contracts/provider";

const BuyXMAS: FrameHandler<
  EnvState,
  typeof PATH.BUY_XMAS,
  BlankInput
> = async (c) => {
  const { deriveState } = c;
  const { buyXMAS } = await deriveState(async (prev) => {
    const router = getUniRouter();

    const { XMAS, WETH, pair } = CONFIGS.envs[CONFIGS.env].contracts;

    const reserve = await getXMAS().balanceOf(pair);
    const [price10] = await router.getAmountsIn(parseEther("10"), [WETH, XMAS]);
    const [price100] = await router.getAmountsIn(parseEther("100"), [
      WETH,
      XMAS,
    ]);
    const [price1000] = await router.getAmountsIn(parseEther("1000"), [
      WETH,
      XMAS,
    ]);

    prev.buyXMAS.price10 = formatEther(price10);
    prev.buyXMAS.price100 = formatEther(price100);
    prev.buyXMAS.price1000 = formatEther(price1000);
    prev.buyXMAS.reserve = formatEther(reserve);

    if (c.transactionId) {
      const receipt = await provider().getTransactionReceipt(c.transactionId);
      if (!receipt) return;
      const swapLog = receipt.logs[receipt.logs.length - 1];
      const swappedAmount = BigInt(
        "0x" + swapLog.data.slice(2 + 64 * 3, 2 + 64 * 4)
      );
      prev.buyXMAS.swappedAmount = formatEther(swappedAmount);
    }
  });

  return c.res({
    imageAspectRatio: "1.91:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {c.transactionId ? (
          <>
            <Box position="absolute" top="0" bottom="0" left="0" right="0">
              <Image src="/got-xmas.png" />
            </Box>
            <Box gap="8" position="absolute" flexDirection="row" bottom="80">
              <Text color="text" size="48">
                Got
              </Text>
              <Text color="yellow" size="48">
                {buyXMAS.swappedAmount}
              </Text>
              <Text color="text" size="48">
                {" "}
                XMAS!
              </Text>
            </Box>
          </>
        ) : (
          <>
            <Box position="absolute" top="0" bottom="0" left="0" right="0">
              <Image src="/buy-xmas.png" />
            </Box>

            <Box
              position="absolute"
              bottom="40"
              fontWeight="700"
              flexDirection="column"
              alignItems="center"
            >
              <Box flexDirection="row" gap="4" marginBottom="2">
                <Text weight="600" align="center" color="yellow" size="24">
                  {buyXMAS.reserve} XMAS
                </Text>
                <Text align="center" color="text" size="24">
                  in the pool
                </Text>
              </Box>
              <Box flexDirection="row" gap="4">
                <Text weight="600" align="center" color="yellow" size="20">
                  10 XMAS
                </Text>
                <Text align="center" color="text" size="20">
                  = {buyXMAS.price10} ETH
                </Text>
              </Box>
              <Box flexDirection="row" gap="4">
                <Text weight="600" align="center" color="yellow" size="20">
                  100 XMAS
                </Text>
                <Text align="center" color="text" size="20">
                  = {buyXMAS.price100} ETH
                </Text>
              </Box>
              <Box flexDirection="row" gap="4">
                <Text weight="600" align="center" color="yellow" size="20">
                  1000 XMAS
                </Text>
                <Text align="center" color="text" size="20">
                  = {buyXMAS.price1000} ETH
                </Text>
              </Box>
            </Box>
          </>
        )}
      </Box>
    ),
    intents: c.transactionId
      ? [<Button action={PATH.HOME}>🏠</Button>]
      : [
          <TextInput placeholder="Enter XMAS amount to buy" />,
          <Button.Transaction target={PATH.BUY_XMAS_TX}>
            Buy
          </Button.Transaction>,
          <Button action={PATH.HOME}>🏠</Button>,
        ],
  });
};

export default BuyXMAS;
