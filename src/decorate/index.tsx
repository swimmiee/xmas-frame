import PATH from "../routes/path.js";
import { Button, FrameHandler, TextInput } from "frog";
import { EnvState } from "../../api";
import { BlankInput } from "hono/types";
import { Box, Image, Text } from "../ui.js";
import { genPath } from "../utils/genPath.js";
import { DecoColItem } from "./DecorateColItem.js";
import { getTree } from "../contracts/tree.js";
import { formatEther } from "ethers";

const DecorateTree: FrameHandler<
  EnvState,
  typeof PATH.DECORATE,
  BlankInput
> = async (c) => {
  const PAGE_ITEM_COUNT = 6;
  const treeId = c.req.param("id"); // URL에서 id 값 추출
  const { decorate } = await c.deriveState(async (prev) => {
    const tree = getTree();

    const ornCount = Number(await tree.ornamentCount());
    const pageCount = Math.ceil(ornCount / PAGE_ITEM_COUNT) - 1;
    const ornPrices = await tree.allOrnamentPrices();
    prev.decorate.ornPrices = ornPrices.map(formatEther);
    prev.decorate.ornCount = ornCount;
    prev.decorate.pageCount = pageCount;

    if (c.buttonValue === "l") {
      prev.decorate.page = Math.max(prev.decorate.page - 1, 0);
    }
    if (c.buttonValue === "r") {
      prev.decorate.page = Math.min(prev.decorate.page + 1, pageCount);
    }
  });

  const ornIdStart = decorate.page * PAGE_ITEM_COUNT + 1;
  const count = Math.min(decorate.ornCount - ornIdStart + 1, PAGE_ITEM_COUNT);

  const orns = new Array(count).fill(0).map((_, i) => {
    return {
      index: ornIdStart + i,
      uri: `/static/ornaments/${ornIdStart + i}.png`,
    };
  });

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
        <Box
          position="absolute"
          alignItems="center"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          <Image src="/static/decorate-bg.png" height="100%" width="100%" />
        </Box>
        <Box flexDirection="row" gap="6">
          <Box flexDirection="column" gap="6">
            {decorate.ornPrices &&
              orns.slice(0, PAGE_ITEM_COUNT / 2).map((o) => {
                const ornPrice = decorate.ornPrices![o.index - 1];
                return (
                  <DecoColItem index={o.index} uri={o.uri} price={ornPrice} />
                );
              })}
          </Box>
          <Box flexDirection="column" gap="6">
            {orns.slice(PAGE_ITEM_COUNT / 2).map((o) => {
              const ornPrice = decorate.ornPrices![o.index - 1];
              return (
                <DecoColItem index={o.index} uri={o.uri} price={ornPrice} />
              );
            })}
          </Box>
        </Box>
        <Box flexDirection="row" gap="2" marginTop="8" marginBottom="-8">
          <Text size="12">{decorate.page + 1}</Text>
          <Text size="12">/</Text>
          <Text size="12">{decorate.pageCount + 1}</Text>
        </Box>
      </Box>
    ),
    intents: [
      <TextInput placeholder="Enter a number..." />,
      <Button value="l">⬅️</Button>,
      <Button value="r">➡️</Button>,
      <Button action={genPath(PATH.DECORATE_CONFIRM, { id: treeId })}>
        Decorate!
      </Button>,
      <Button action={genPath(PATH.TREE_HOME, { id: treeId })}>Back</Button>,
    ],
  });
};

export default DecorateTree;
