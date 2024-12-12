import { CONFIGS } from "../configs.js";
import { UniRouter, UniRouter__factory } from "../typechain/index.js";
import { provider } from "./provider.js";

export const getUniRouter = (): UniRouter => {
  return UniRouter__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.router,
    provider()
  );
}