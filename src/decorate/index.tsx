import { Button, FrameHandler, TextInput } from "frog";
import PATH from "../routes/path";
import { EnvState } from "..";
import { BlankInput } from "hono/types";
import { Box } from "../ui";
import { genPath } from "../utils/genPath";
import { CONFIGS } from "../configs";
import { DecoColItem } from "./DecorateColItem";

const DecorateTree: FrameHandler<
  EnvState,
  typeof PATH.DECORATE,
  BlankInput
> = async (c) => {
  const PAGE_COUNT = 6;
  const treeId = c.req.param("id"); // URL에서 id 값 추출
  const { decorate } = c.deriveState((prev) => {
    if (c.buttonValue === "l") {
      prev.decorate.page = Math.max(prev.decorate.page - 1, 0);
    }
    if (c.buttonValue === "r") {
      prev.decorate.page = Math.min(
        prev.decorate.page + 1,
        Math.ceil(CONFIGS.ornCount / PAGE_COUNT) - 1
      );
    }
  });

  const ornIdStart = decorate.page * PAGE_COUNT + 1;
  const count = Math.min(CONFIGS.ornCount - ornIdStart + 1, PAGE_COUNT);

  const orns = new Array(count).fill(0).map((_, i) => {
    return {
      index: ornIdStart + i,
      uri: `/ornaments/${ornIdStart + i}.png`,
    };
  });

  // const ornsInfo =

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        background="background"
        position="relative"
        padding="6"
        gap="6"
      >
        <Box flexDirection="column" gap="6">
          {orns.slice(0, PAGE_COUNT / 2).map((o) => {
            const orn = CONFIGS.orns[o.index - 1];
            return (
              <DecoColItem
                index={o.index}
                uri={o.uri}
                priceUnit={orn.priceUnit}
              />
            );
          })}
        </Box>
        <Box flexDirection="column" gap="6">
          {orns.slice(PAGE_COUNT / 2).map((o) => {
            const orn = CONFIGS.orns[o.index - 1];
            return (
              <DecoColItem
                index={o.index}
                uri={o.uri}
                priceUnit={orn.priceUnit}
              />
            );
          })}
        </Box>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter a number..." />,
      <Button value="l">{"<"}</Button>,
      //   <Button.Signature target={"/create/tx/" + create.bgId}>
      <Button
        // action={genPath(PATH.DECORATE_SELECT, {
        //   id: treeId,
        //   ornId: decorate.ornId,
        // })}
        action={genPath(PATH.DECORATE_CONFIRM, {
          id: treeId,
          ornId: "1",
        })}
      >
        Decorate
      </Button>,
      <Button value="r">{">"}</Button>,
      <Button action={genPath(PATH.TREE_HOME, { id: treeId })}>Back</Button>,
    ],
  });
};

export default DecorateTree;
