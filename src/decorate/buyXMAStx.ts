import { parseEther, TransactionHandler } from "frog";
import { CONFIGS } from "../configs";
import { UniRouter__factory } from "../typechain";
import { getUniRouter } from "../contracts/UniRouter";
import { MaxUint256 } from "ethers";

const BuyXMASTx: TransactionHandler = async (c) => {
  const amount_ = c.inputText;
  if (!amount_ || isNaN(Number(amount_))) throw new Error("Invalid amount");
  const amount = parseEther(amount_);
  const config = CONFIGS.envs[CONFIGS.env];

  const path = [config.contracts.WETH, config.contracts.XMAS];
  const [amountIn] = await getUniRouter().getAmountsIn(amount, path);

  return c.contract({
    abi: UniRouter__factory.abi,
    chainId: config.chainId,
    functionName: "swapETHForExactTokens",
    args: [amount, path, c.address as `0x${string}`, MaxUint256],
    to: config.contracts.router,
    value: (amountIn * 10001n) / 10000n,
  });
};

export default BuyXMASTx;
