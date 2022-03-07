import { setupMetamask } from "../utils/web3";

export const changeChain = (chainId: number) => {
  const { ethereum } = setupMetamask();
  return ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${chainId}` }], // chainId must be in hexadecimal numbers
  });
};
