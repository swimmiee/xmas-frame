import { Button, FrameHandler } from "frog";
import { EnvState } from "..";
import PATH from "../routes/path";
import { BlankInput } from "hono/types";
import { Box, Image, Text } from "../ui";
import { genPath } from "../utils/genPath";
import { CONFIGS } from "../configs";

const DecorateConfirm: FrameHandler<
  EnvState,
  typeof PATH.DECORATE_CONFIRM,
  BlankInput
> = (c) => {
  const treeId = c.req.param("id");
  const {
    decorate: { ornId },
  } = c.deriveState((prev) => {
    prev.decorate.ornId = c.inputText
      ? Number(c.inputText)
      : prev.decorate.ornId ?? 0;
  });
  const orn = CONFIGS.orns[Number(ornId) - 1];
  const ornUri = `/ornaments/${ornId}.png`;

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="background"
        position="relative"
        padding="6"
        gap="6"
      >
        <Box
          display="flex"
          background="background400"
          borderRadius="4"
          gap="16"
          width="160"
          padding="24"
          alignItems="center"
          marginBottom="16"
        >
          <Image src={ornUri} width="72" height="72" />
          <Box flexDirection="row" gap="6">
            <Box
              background="gray1000"
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
              {String(orn.priceUnit * 0.005)} ETH
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
