import { parseEther, TransactionHandler } from "frog";
import { CONFIGS } from "../configs";
import { XmasTree__factory } from "../typechain";

const CreateTx: TransactionHandler = (c) => {
  const bgId = c.req.param("bgId");
  if (isNaN(Number(bgId))) throw new Error("Errorneous Bg ID");
  const data = XmasTree__factory.createInterface().encodeFunctionData(
    "createTree",
    [Number(bgId)]
  ) as `0x${string}`;

  return c.res({
    chainId: CONFIGS.envs[CONFIGS.env].chainId,
    method: "eth_sendTransaction",
    params: {
      to: CONFIGS.envs[CONFIGS.env].contracts.tree,
      data,
      value: parseEther("0.001"),
    },
    
    
  });
};

export default CreateTx;
