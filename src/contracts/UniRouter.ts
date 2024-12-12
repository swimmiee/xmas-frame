import { CONFIGS } from "../configs";
import { UniRouter, UniRouter__factory } from "../typechain";
import { provider } from "./provider";

export const getUniRouter = (): UniRouter => {
  return UniRouter__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.router,
    provider()
  );
}