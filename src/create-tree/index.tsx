import PATH from "../routes/path.js";
import { Button, FrameHandler } from "frog";
import { BlankInput } from "hono/types";
import { Box, Text } from "../ui.js";
import { EnvState } from "../../api";
import { TreeSelector } from "./TreeSelector.js";
import { genPath } from "../utils/genPath.js";
import { getTree } from "../contracts/tree.js";
import { formatEther } from "ethers";
import { provider } from "../contracts/provider.js";
import { getXMAS } from "../contracts/XMAS.js";

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

    if (c.transactionId) {
      if (prev.create.createdTreeId) return;
      // prev.create.nextTreeId = prev.create.nextTreeId - 1;
      const prv = provider();
      const r = await prv.getTransactionReceipt(c.transactionId);
      const createdTreeId = Number(
        BigInt(r?.logs[r.logs.length - 1].topics[2] ?? "0")
      );
      console.log(createdTreeId);
      prev.create.createdTreeId = createdTreeId;
    } else {
      prev.create.nextTreeId = Number(await tree.nextTreeId());
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
    if (!c?.var?.interactor?.custodyAddress) return;
    // @ts-ignore
    const userAddress = c.var!.interactor!.custodyAddress;
    prev.create.xmasBalance = await getXMAS()
      .balanceOf(userAddress)
      .then((balance) => formatEther(balance));
  });

  console.log(create.createdTreeId);

  const host =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://xmas-tree-pi.vercel.app";
  const postUrl = `${host}${genPath(PATH.TREE_HOME, {
    id: create.createdTreeId,
  })}`;
  const href = `https://warpcast.com/~/compose?embeds[]=${postUrl}`;

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
            <Box flexDirection="row" gap="3">
              <Text color="text" size="14">
                Price:
              </Text>
              <Text color="yellow" size="14">
                {create.bgPrices![create.bgId - 1]}
              </Text>
              <Text color="text" size="14">
                XMAS
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    ),
    intents: c.transactionId
      ? [
          <Button.Link href={href}>Post</Button.Link>,
          <Button action={genPath(PATH.TREE_HOME, { id: create.nextTreeId })}>
            View My Tree 🎄
          </Button>,
        ]
      : [
          <Button value="l">⬅️</Button>,
          <Button value="r">➡️</Button>,
          <Button.Transaction
            target={genPath(PATH.CREATE_TREE_TX, { bgId: create.bgId })}
          >
            Create!
          </Button.Transaction>,
          <Button action={PATH.HOME}>🏠</Button>,
        ],
  });
};

export default CreateTree;
