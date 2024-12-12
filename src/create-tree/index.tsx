import PATH from "../routes/path";
import { Button, FrameHandler } from "frog";
import { BlankInput } from "hono/types";
import { Box, Text } from "../ui";
import { EnvState } from "..";
import { TreeSelector } from "./TreeSelector";
import { genPath } from "../utils/genPath";
import { getTree } from "../contracts/tree";
import { formatEther } from "ethers";
import { getXMAS } from "../contracts/XMAS";

const CreateTree: FrameHandler<
  EnvState,
  typeof PATH.CREATE_TREE,
  BlankInput
> = async (c) => {
  const { buttonValue, deriveState } = c;
  const { create } = await deriveState(async (prev) => {
    const tree = getTree();
    const bgCount = Number(await tree.bgCount());
    const bgPrices = await tree.allBgPrices();

    prev.create.nextTreeId = Number(await tree.nextTreeId());
    if (c.transactionId) {
      prev.create.nextTreeId = prev.create.nextTreeId - 1;
    }
    prev.create.bgPrices = bgPrices.map((p) => String(+formatEther(p)));
    prev.create.bgCount = bgCount;
    if (buttonValue === "l") {
      prev.create.bgId = Math.max(prev.create.bgId - 1, 1);
    }
    if (buttonValue === "r") {
      prev.create.bgId = Math.min(prev.create.bgId + 1, bgCount);
    }

    // @ts-ignore
    const userAddress = c.var.interactor.custodyAddress;
    prev.create.xmasBalance = await getXMAS()
      .balanceOf(userAddress)
      .then((balance) => formatEther(balance));
  });

  const host =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:5173";
  const postUrl = `${host}${genPath(PATH.TREE_HOME, {
    id: create.nextTreeId,
  })}`;

  return c.res({
    imageAspectRatio: "1:1",
    image: (
      <Box
        grow
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        background="xgreen"
        position="relative"
      >
        <TreeSelector no={create.bgId} />
        <Box position="absolute" top="24" fontWeight="700">
          <Text color="text" size="18">
            Create My Tree 🎄
          </Text>
          <Text align="center" color="text" size="10">
            {create.xmasBalance && `(My Balance: ${create.xmasBalance} XMAS)`}
          </Text>
        </Box>
        <Box
          position="absolute"
          bottom="16"
          fontWeight="700"
          alignItems="center"
        >
          <Text color="text" size="14">
            {create.bgId} / {create.bgCount}
          </Text>
          {create.bgPrices && (
            <Text color="text" size="14">
              Price: {create.bgPrices![create.bgId - 1]} XMAS
            </Text>
          )}
        </Box>
      </Box>
    ),
    intents: c.transactionId
      ? [
          <Button.Link href={`https://warpcast.com/~/compose?text=${postUrl}`}>
            Post
          </Button.Link>,
          <Button action={genPath(PATH.TREE_HOME, { id: create.nextTreeId })}>
            View My Tree 🎄
          </Button>,
        ]
      : [
          <Button value="l">⬅️</Button>,
          //   <Button.Signature target={"/create/tx/" + create.bgId}>
          <Button.Transaction
            target={genPath(PATH.CREATE_TREE_TX, { bgId: create.bgId })}
          >
            Create
          </Button.Transaction>,
          <Button value="r">➡️</Button>,
          <Button action={PATH.HOME}>🏠</Button>,
        ],
  });
};

export default CreateTree;
