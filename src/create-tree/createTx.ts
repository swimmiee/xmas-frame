import { TransactionHandler } from "frog";
import { CONFIGS } from "../configs.js";
import { XmasTree__factory } from "../typechain/index.js";

const CreateTx: TransactionHandler = (c) => {
  const bgId = c.req.param("bgId");
  if (isNaN(Number(bgId))) throw new Error("Errorneous Bg ID");
  return c.contract({
    abi: XmasTree__factory.abi,
    chainId: CONFIGS.envs[CONFIGS.env].chainId,
    functionName: "createTree",
    args: [+bgId],
    to: CONFIGS.envs[CONFIGS.env].contracts.XmasTree,
  });
};

export default CreateTx;
