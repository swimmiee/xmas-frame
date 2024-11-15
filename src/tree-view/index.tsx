import { Button, Env, FrameHandler } from "frog";
import { Box } from "../ui";
import { TreeBackground } from "./TreeBackground";
import { PlainTree } from "./PlainTree";
import { Ornament } from "./Ornament";
import { BlankInput } from "hono/types";
import PATH from "../routes/path";

const TreeMain: FrameHandler<Env, "/", BlankInput> = (c) => {
  const { status, req } = c;
  const id = req.param("id");


  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="background200"
        position="relative"
      >
        <TreeBackground no={1} />
        <PlainTree />

        <Ornament position={0} itemId={3} />
        <Ornament position={1} itemId={4} />
        <Ornament position={2} itemId={5} />
        <Ornament position={3} itemId={6} />
        <Ornament position={4} itemId={7} />
        <Ornament position={5} itemId={8} />
        <Ornament position={6} itemId={9} />
        <Ornament position={7} itemId={10} />
      </Box>
    ),
    intents: [
      <Button action={PATH.CREATE_TREE}>Create Tree</Button>,
      <Button value="create">{id ?? "ID"}</Button>,

    ],
  });
};

export default TreeMain;
