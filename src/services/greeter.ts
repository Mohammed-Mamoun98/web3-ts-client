import { contractReader } from "../utils/contracts";

export const getGreeterValue = () =>
  contractReader({
    contractName: "Greeter",
    functionName: "greet",
  });

export const setGreeting = (newGreeting: string) =>
  contractReader({
    contractName: "Greeter",
    functionName: "setGreeting",
    params: [newGreeting],
    write: true,
  });
