import { CONFIGS } from "../configs";
import { XmasTree, XmasTree__factory } from "../typechain";
import { provider } from "./provider";

export const getTree = (): XmasTree => {
  return XmasTree__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.XmasTree,
    provider()
  );
};
