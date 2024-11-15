import { TransactionHandler } from "frog";
import { CONFIGS } from "../configs";
const CreateTx: TransactionHandler = (c) => {
  return c.send({
    chainId: CONFIGS.chainId,
    to: "0x....",
    data: "0x...."
  });
};

export default CreateTx;
