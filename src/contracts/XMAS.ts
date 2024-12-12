import { CONFIGS } from "../configs.js";
import { XMAS, XMAS__factory } from "../typechain/index.js";
import { provider } from "./provider.js";

export const getXMAS = (): XMAS => {
  return XMAS__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.XMAS,
    provider()
  );
};
