import PATH from "../routes/path";
import { Button, FrameHandler } from "frog";
import { BlankInput } from "hono/types";
import { Box, Text } from "../ui";
import { EnvState } from "..";
import { CONFIGS } from "../configs";
import { TreeBackground } from "../tree-view/TreeBackground";
import { PlainTree } from "../tree-view/PlainTree";

const CreateTree: FrameHandler<
  EnvState,
  typeof PATH.CREATE_TREE,
  BlankInput
> = (c) => {
  const { buttonValue, previousState, status } = c;
  const { create } = c.deriveState((prev) => {
    if (buttonValue === "left") {
      prev.create.bgId = Math.max(prev.create.bgId - 1, 0);
    }
    if (buttonValue === "right") {
      prev.create.bgId = Math.min(prev.create.bgId + 1, CONFIGS.bgCount);
    }
  });

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="text400"
        position="relative"
      >
        <TreeBackground no={create.bgId} />
        <PlainTree />
      </Box>
    ),
    intents: [
      <Button value="left">{"<"}</Button>,
      <Button.Signature target="">OK</Button.Signature>,
      <Button value="right">{">"}</Button>,
    ],
  });
};

export default CreateTree;
