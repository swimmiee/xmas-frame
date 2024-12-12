import { Button, FrameHandler } from "frog";
import { EnvState } from "..";
import PATH from "../routes/path";
import { BlankInput } from "hono/types";
import { Box, Image, Text } from "../ui";
import { genPath } from "../utils/genPath";
import { getTree } from "../contracts/tree";
import { formatEther } from "ethers";

const DecorateConfirm: FrameHandler<
  EnvState,
  typeof PATH.DECORATE_CONFIRM,
  BlankInput
> = async (c) => {
  const treeId = c.req.param("id");
  const {
    decorate: { currOrnId: ornId, currOrnPrice: ornPrice },
  } = await c.deriveState(async (prev) => {
    prev.decorate.currOrnId = c.inputText
      ? Number(c.inputText)
      : prev.decorate.currOrnId ?? 0;

    const ornPrice = await getTree().ornamentPrices(prev.decorate.currOrnId);
    prev.decorate.currOrnPrice = ornPrice.toString();
  });
  const ornUri = `/ornaments/${ornId}.png`;
  console.log(treeId, ornId, ornPrice);

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background={c.transactionId ? "xgreen" : "background"}
        position="relative"
        padding="6"
        gap="6"
      >
        <Box
          display="flex"
          background={"background400"}
          borderRadius="4"
          gap="16"
          width="108"
          height="108"
          alignItems="center"
          justifyContent="center"
          marginBottom="16"
        >
          <Image src={ornUri} width="48" height="48" />
          <Box flexDirection="row" gap="6">
            <Box
              background={"gray1000"}
              borderRadius="4"
              marginTop="2"
              width="12"
              height="12"
              paddingTop="1"
              paddingLeft="1"
            >
              <Text color="background" align="center" size="8">
                {String(ornId)}
              </Text>
            </Box>
            <Text color="text" align="center" size="14">
              {+formatEther(ornPrice)} XMAS
            </Text>
          </Box>
        </Box>

        <Text>{c.transactionId ? "Done!" : "Decorate Now!"}</Text>
      </Box>
    ),
    intents: c.transactionId
      ? [
          <Button action={genPath(PATH.TREE_HOME, { id: treeId })}>
            View Tree 👀
          </Button>,
        ]
      : [
          <Button action={genPath(PATH.DECORATE, { id: treeId })}>Back</Button>,
          <Button.Transaction
            target={genPath(PATH.DECORATE_TX, { id: treeId, ornId: ornId! })}
          >
            Confirm
          </Button.Transaction>,
        ],
  });
};

export default DecorateConfirm;
