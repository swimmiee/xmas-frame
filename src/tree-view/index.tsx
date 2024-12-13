import { Button, FrameHandler } from "frog";
import { Box } from "../ui.js";
import { TreeBackground } from "./TreeBackground.js";
import { PlainTree } from "./PlainTree.js";
import { Ornament } from "./Ornament.js";
import { BlankInput } from "hono/types";
import PATH from "../routes/path.js";
// import { getTree } from "../contracts/tree.js";
import { EnvState } from "../../api";
import { genPath } from "../utils/genPath.js";

const TreeMain: FrameHandler<
  EnvState,
  typeof PATH.TREE_HOME,
  BlankInput
> = async (c) => {
  const { req } = c;

  let treeId = req.param("id")!;
  if (isNaN(Number(treeId))) treeId = "0";

  // @ts-ignore
  const tree = c.var.tree;

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="text"
        position="relative"
      >
        <TreeBackground no={Number(tree.bgId)} />
        <PlainTree />

        {(tree.ornamentIds as number[]).map((oId, i) => {
          return oId > 0 ? <Ornament position={i} itemId={oId} /> : null;
        })}
      </Box>
    ),
    intents: [
      <Button action={PATH.CREATE_TREE}>Create 🎄</Button>,
      <Button action={genPath(PATH.DECORATE, { id: treeId })}>
        Decorate ⭐️
      </Button>,
      <Button action={PATH.HOME}>🏠</Button>,
    ],
  });
};

export default TreeMain;
