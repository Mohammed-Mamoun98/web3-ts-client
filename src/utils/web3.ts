import Web3 from "web3";

export const _window = window as any;

interface IEtherium {
  ethereum: any;
}

export const setupMetamask: () => Promise<IEtherium> = async () => {
  const { ethereum } = window as any;
  if (!ethereum) throw new Error("Please Enable Metamask");
  await ethereum.enable();
  return { ethereum };
};

export const setupWeb3 = async () => {
  const { ethereum } = await setupMetamask();
  const _web3 = new Web3(ethereum);
  await ethereum.enable();

  (window as any)._web3 = _web3;
};
