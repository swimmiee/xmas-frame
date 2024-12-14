import PATH from "../routes/path.js";
import { Button, FrameHandler } from "frog";
import { EnvState } from "../../api";
import { BlankInput } from "hono/types";
import { Image } from "../ui.js";
import { genPath } from "../utils/genPath.js";

const HomePage: FrameHandler<EnvState, typeof PATH.HOME, BlankInput> = async (
  c
) => {
  return c.res({
    imageAspectRatio: "1.91:1",
    image: <Image src="/static/cover.png" height="100%" width="100%" />,
    intents: [
      <Button action={genPath(PATH.TREE_HOME, { id: "0" })}>Example</Button>,
      <Button action={genPath(PATH.SEARCH_TREE, { id: "0" })}>My Tree</Button>,
      <Button action={PATH.CREATE_TREE}>Create Tree</Button>,
      <Button action={PATH.BUY_XMAS}>Buy $XMAS</Button>,
    ],
  });
};
export default HomePage;
