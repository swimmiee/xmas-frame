import PATH from "../routes/path.js";
import { Button, FrameHandler, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { Box, Text } from "../ui.js";
import { EnvState } from "../../api";
import { formatEther, parseEther } from "ethers";
import { getUniRouter } from "../contracts/UniRouter.js";
import { CONFIGS } from "../configs.js";
import { getXMAS } from "../contracts/XMAS.js";
import { provider } from "../contracts/provider.js";

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
        background={c.transactionId ? "xgreen" : "xblue"}
        position="relative"
      >
        {c.transactionId ? (
          <Box position="absolute" top="36" fontWeight="700">
            <Text color="text" size="24">
              Got {buyXMAS.swappedAmount} XMAS!
            </Text>
          </Box>
        ) : (
          <>
            <Box position="absolute" top="36" fontWeight="700">
              <Text color="text" size="24">
                Buy $XMAS
              </Text>
            </Box>

            <Box
              position="absolute"
              bottom="16"
              fontWeight="700"
              flexDirection="column"
              alignItems="center"
            >
              <Text align="center" color="text" size="24">
                {buyXMAS.reserve} XMAS in the pool
              </Text>
              <Text align="center" color="text" size="24">
                10 XMAS = {buyXMAS.price10} ETH
              </Text>
              <Text align="center" color="text" size="24">
                100 XMAS = {buyXMAS.price100} ETH
              </Text>
              <Text align="center" color="text" size="24">
                1000 XMAS = {buyXMAS.price1000} ETH
              </Text>
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
