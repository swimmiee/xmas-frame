import { JsonRpcProvider } from "ethers";
import { CONFIGS } from "../configs";

export const provider = () =>
  new JsonRpcProvider(CONFIGS.envs[CONFIGS.env].rpcUrl);
