import PATH from "../routes/path";
import { Button, FrameHandler } from "frog";
import { EnvState } from "..";
import { BlankInput } from "hono/types";
import { Image } from "../ui";
import { genPath } from "../utils/genPath";

const HomePage: FrameHandler<EnvState, typeof PATH.HOME, BlankInput> = async (
  c
) => {
  return c.res({
    imageAspectRatio: "1.91:1",
    image: <Image src="/cover.png" width="100%" height="100%" />,
    intents: [
      <Button action={genPath(PATH.TREE_HOME, { id: "0" })}>Example</Button>,
      <Button action={PATH.CREATE_TREE}>Create Tree</Button>,
      <Button action={PATH.BUY_XMAS}>Buy $XMAS</Button>,
    ],
  });
};
export default HomePage;
