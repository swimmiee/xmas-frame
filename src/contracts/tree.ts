import { CONFIGS } from "../configs.js";
import { XmasTree, XmasTree__factory } from "../typechain/index.js";
import { provider } from "./provider.js";

export const getTree = (): XmasTree => {
  return XmasTree__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.XmasTree,
    provider()
  );
};
