import Web3 from "web3";

export const _window = window as any;

interface IEtherium {
  ethereum: any;
}

export const enableMM = async () => {
  const { ethereum } = window as any;
  await ethereum.enable();
};

export const setupMetamask: () => IEtherium = () => {
  const { ethereum } = window as any;
  if (!ethereum) throw new Error("Please Enable Metamask");
  return { ethereum };
};

export const setupWeb3 = async () => {
  try {
    const { ethereum } = await setupMetamask();
    console.log({ ethereum });

    const _web3 = new Web3(ethereum);
    return new Promise((resolve, reject) => {
      (window as any)._web3 = _web3;
      resolve(_web3);
    });
  } catch (error) {
    // alert(JSON.stringify(error));
  }
};
