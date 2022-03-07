import { enableMM, setupMetamask, setupWeb3, _window } from "../utils/web3";
import { wait } from "./time";

export const checkWeb3Instance: () => any = async () => {
  console.log({ aa: (window as any)._web3 });

  if (!(window as any)._web3) {
    await setupWeb3();
    await wait(1000);
    return checkWeb3Instance();
  } else {
  }
};

export const getWallet = async () => {
  await enableMM();
  const [account] = await (window as any)._web3.eth.getAccounts();
  return account;
};
