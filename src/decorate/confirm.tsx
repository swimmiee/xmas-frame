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

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Image
          src={
            c.transactionId ? "/decorate-done.png" : "/decorate-confirm-bg.png"
          }
          height="100%"
        />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
        >
          <Box
            display="flex"
            borderRadius="4"
            gap="12"
            width="128"
            height="128"
            alignItems="center"
            justifyContent="center"
            marginBottom="72"
          >
            <Image src={ornUri} width="64" height="64" />
            <Box flexDirection="row" gap="6">
              <Box
                background={"gray1000"}
                borderRadius="4"
                marginTop="2"
                width="14"
                height="14"
                paddingTop="1"
                paddingLeft="1"
              >
                <Text color="background" align="center" size="10">
                  {String(ornId)}
                </Text>
              </Box>
              <Text color="text" align="center" size="16">
                {+formatEther(ornPrice)} XMAS
              </Text>
            </Box>
          </Box>
        </Box>
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
