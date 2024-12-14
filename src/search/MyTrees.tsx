import PATH from "../routes/path.js";
import { Button, FrameHandler } from "frog";
import { isAddress } from "ethers";
import { EnvState } from "../../api";
import { BlankInput } from "hono/types";
import { Box, Image, Text } from "../ui.js";
import { getTree } from "../contracts/tree.js";
import { genPath } from "../utils/genPath.js";

const MyTrees: FrameHandler<
  EnvState,
  typeof PATH.MY_TREES,
  BlankInput
> = async (c) => {
  const { deriveState, inputText, buttonValue } = c;
  const PAGE_ITEM_COUNT = 1;

  const paramAddr = c.req.param("address");
  const { search_tree } = await deriveState(async (prev) => {
    let address: string;
    if (paramAddr) {
      address = paramAddr;
    } else if (!inputText || !isAddress(inputText)) {
      prev.search_tree.state = "Invalid";
      return;
    } else {
      address = inputText;
    }

    const tree = getTree();
    const owns = await tree.ownedTreeList(
      address,
      prev.search_tree.page * PAGE_ITEM_COUNT,
      PAGE_ITEM_COUNT
    );

    const ownedCount = Number(owns.ownedCount);
    prev.search_tree.ownedCount = ownedCount;
    prev.search_tree.ownedTrees = owns.result.map((t) => ({
      treeId: Number(t.treeId),
      bgId: Number(t.bgId),
      ornamentCount: Number(t.ornamentCount),
    }));

    const pageCount = Math.ceil(ownedCount / PAGE_ITEM_COUNT) - 1;

    if (buttonValue === "l") {
      prev.search_tree.page = Math.max(prev.search_tree.page - 1, 0);
    }
    if (buttonValue === "r") {
      prev.search_tree.page = Math.min(prev.search_tree.page + 1, pageCount);
    }
  });

  const intents = [];
  if (search_tree.ownedCount > 1) {
    intents.push(<Button value="l">⬅️</Button>, <Button value="r">➡️</Button>);
  }
  intents.push(<Button action={PATH.SEARCH_TREE}>Back</Button>);
  if (search_tree.ownedCount > 0) {
    const host = "https://xmas-tree-pi.vercel.app";

    const url0 =
      search_tree.ownedTrees.length > 0
        ? `${host}${genPath(PATH.TREE_HOME, {
            id: search_tree.ownedTrees[0].treeId,
          })}`
        : "";
    const href0 = `https://warpcast.com/~/compose?embeds[]=${url0}`;

    intents.push(<Button.Link href={href0}>Post</Button.Link>);
  } else {
    intents.push(<Button action={PATH.CREATE_TREE}>Create Tree 🎄</Button>);
  }

  return c.res({
    imageAspectRatio: "1.91:1",
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
          <Image
            src={
              search_tree.ownedCount === 0
                ? "/static/no-tree.png"
                : "/static/search-result.png"
            }
            height="100%"
            width="100%"
          />
        </Box>

        <Box flexDirection="row" gap="24">
          {search_tree.ownedTrees.map((tree, i) => (
            <Box key={i} flexDirection="column" gap="8">
              <Image
                borderRadius="4"
                src={`/static/bg/bg-${tree.bgId + 1}.png`}
                height="224"
                width="224"
              />
              <Box position="absolute">
                <Image
                  borderRadius="4"
                  src={`/static/tree.png`}
                  height="224"
                  width="224"
                />
              </Box>

              <Box background="text" padding="4" borderRadius="4">
                <Text align="center" color="background" size="16">
                  #{String(tree.treeId)}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    ),
    intents,
  });
};

export default MyTrees;
