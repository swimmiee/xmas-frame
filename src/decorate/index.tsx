import { Button, FrameHandler, TextInput } from "frog";
import PATH from "../routes/path";
import { EnvState } from "..";
import { BlankInput } from "hono/types";
import { Box, Image } from "../ui";
import { genPath } from "../utils/genPath";
import { DecoColItem } from "./DecorateColItem";
import { getTree } from "../contracts/tree";
import { formatEther } from "ethers";

const DecorateTree: FrameHandler<
  EnvState,
  typeof PATH.DECORATE,
  BlankInput
> = async (c) => {
  const PAGE_COUNT = 6;
  const treeId = c.req.param("id"); // URL에서 id 값 추출
  const { decorate } = await c.deriveState(async (prev) => {
    const tree = getTree();
    const ornCount = Number(await tree.ornamentCount());
    const ornPrices = await tree.allOrnamentPrices();
    prev.decorate.ornPrices = ornPrices.map(formatEther);

    prev.decorate.ornCount = ornCount;
    if (c.buttonValue === "l") {
      prev.decorate.page = Math.max(prev.decorate.page - 1, 0);
    }
    if (c.buttonValue === "r") {
      prev.decorate.page = Math.min(
        prev.decorate.page + 1,
        Math.ceil(ornCount / PAGE_COUNT) - 1
      );
    }
  });

  const ornIdStart = decorate.page * PAGE_COUNT + 1;
  const count = Math.min(decorate.ornCount - ornIdStart + 1, PAGE_COUNT);

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
        position="relative"
        padding="6"
        gap="6"
      >
        <Box position="absolute" top="0" bottom="0" left="0" right="0">
          <Image src="/decorate-bg.png" />
        </Box>
        <Box flexDirection="column" gap="6">
          {decorate.ornPrices &&
            orns.slice(0, PAGE_COUNT / 2).map((o) => {
              const ornPrice = decorate.ornPrices![o.index - 1];
              return (
                <DecoColItem index={o.index} uri={o.uri} price={ornPrice} />
              );
            })}
        </Box>
        <Box flexDirection="column" gap="6">
          {orns.slice(PAGE_COUNT / 2).map((o) => {
            const ornPrice = decorate.ornPrices![o.index - 1];
            return <DecoColItem index={o.index} uri={o.uri} price={ornPrice} />;
          })}
        </Box>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter a number..." />,
      <Button value="l">⬅️</Button>,
      //   <Button.Signature target={"/create/tx/" + create.bgId}>
      <Button action={genPath(PATH.DECORATE_CONFIRM, { id: treeId })}>
        Decorate
      </Button>,
      <Button value="r">➡️</Button>,
      <Button action={genPath(PATH.TREE_HOME, { id: treeId })}>Back</Button>,
    ],
  });
};

export default DecorateTree;
