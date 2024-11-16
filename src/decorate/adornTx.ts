import { parseEther, TransactionHandler } from "frog";
import { CONFIGS } from "../configs";
import { XmasTree__factory } from "../typechain";

const AdornTx: TransactionHandler = (c) => {
  const treeId = c.req.param("id");
  const ornId = c.req.param("ornId");

  if (isNaN(Number(treeId))) throw new Error("Errorneous Bg ID");

  console.log(Number(treeId),
  Number(ornId),)
  const data = XmasTree__factory.createInterface().encodeFunctionData("adorn", [
    Number(treeId),
    Number(ornId),
  ]) as `0x${string}`;

  const config = CONFIGS.envs[CONFIGS.env];
  const orn = CONFIGS.orns[Number(ornId) - 1];
  return c.send({
    chainId: config.chainId,
    to: config.contracts.tree,
    data,
    value: parseEther("0.0005") * BigInt(orn.priceUnit),
  });
};

export default AdornTx;
