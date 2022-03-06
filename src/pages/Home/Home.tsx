import React, { useEffect, useState } from "react";
import { Box, Flex } from "../../components/containers";
import { usePromise } from "../../hooks/usePromise";
import { getWallet } from "../../services/web3";
import theme from "../../styles/theme";
import { contractReader } from "../../utils/contracts";

export default function Home() {
  const [value, setValue] = useState("");
  const [, gretterValue] = usePromise(
    () =>
      contractReader({
        contractName: "Greeter",
        functionName: "greet",
      }),
    { initReq: true }
  );

  console.log({ gretterValue });

  const [setGreeting, response, loading, error] = usePromise(() =>
    contractReader({
      contractName: "Greeter",
      functionName: "setGreeting",
      params: [value],
      write: true,
    })
  );

  const handleChange = ({ target: { value: _value } }: any) => {
    setValue(_value);
  };
  return (
    <>
      <Flex gap={theme.spacings.medium}>
        <button onClick={setGreeting}>Check</button>{" "}
        <input onChange={handleChange} placeholder="set Greeting" />
        {JSON.stringify({ response, loading, error, gretterValue })}
      </Flex>
    </>
  );
}
