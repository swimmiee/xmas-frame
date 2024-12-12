import { TransactionHandler } from "frog";
import { CONFIGS } from "../configs";
import { XmasTree__factory } from "../typechain";

const AdornTx: TransactionHandler = async (c) => {
  const treeId = c.req.param("id");
  const ornId = c.req.param("ornId");

  if (isNaN(Number(treeId))) throw new Error("Errorneous Bg ID");

  const config = CONFIGS.envs[CONFIGS.env];

  return c.contract({
    abi: XmasTree__factory.abi,
    chainId: config.chainId,
    functionName: "adorn",
    args: [BigInt(treeId), BigInt(ornId)],
    to: config.contracts.XmasTree,
  });
};

export default AdornTx;
