import contracts from "../data/cotracts.json";
import { checkWeb3Instance, getWallet } from "../services/web3";

export interface IContract {
  abi: Array<any>;
  address: string;
}

type IContracts = {
  [key: string]: IContract;
};

interface IContractReaderParam {
  contractName: string;
  functionName?: string;
  write?: boolean;
  params?: any[];
}

const getContractInfo: (contractName: string) => {
  address: string;
  abi: any[];
} = (contractName) => {
  const matchContractInstance: IContract | any = (contracts as IContracts)?.[
    contractName
  ];
  return {
    address: matchContractInstance?.address,
    abi: matchContractInstance?.abi,
  };
};

//             .send({ from: account })
//             .once('transactionHash', () => {})
//             .once('receipt', (receipt) => {
//               console.log('depositHPool_receipt', receipt);
//               resolve(receipt);
//             })
//             .on('error', (err) => {
//               console.log('depositHPool_receipt_error', err);
//               reject(err);
// });

const createContract = ({ abi, address }: { abi: any[]; address: string }) =>
  new (window as any)._web3.eth.Contract(abi, address);

let contractsObj = {};

export const contractReader = async ({
  contractName,
  functionName = "",
  write = false,
  params = [],
}: IContractReaderParam) => {
  await checkWeb3Instance();
  let result: any = "";
  const account = await getWallet();

  const { address, abi } = getContractInfo(contractName);
  const contractInstance = await createContract({ abi, address });
  const fucntionRef = contractInstance.methods?.[functionName];
  const callMethod = !write ? "call" : "send";

  contractsObj = {
    ...contractsObj,
    [contractName]: contractInstance,
    test: fucntionRef,
    result,
  };
  (window as any).contractsObj = contractsObj;

  return new Promise(async (resolve, reject) => {
    if (!write) {
      result = await fucntionRef(...params)?.[callMethod]?.(...params);
      resolve(result);
    } else {
      fucntionRef(...params)
        ?.[callMethod]?.({ from: account })
        .once("receipt", (rec: any) => resolve(rec))
        .on("error", (error: any) => reject(error));
    }
  });
};
