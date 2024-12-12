import { CONFIGS } from "../configs";
import { XMAS, XMAS__factory } from "../typechain";
import { provider } from "./provider";

export const getXMAS = (): XMAS => {
  return XMAS__factory.connect(
    CONFIGS.envs[CONFIGS.env].contracts.XMAS,
    provider()
  );
};
