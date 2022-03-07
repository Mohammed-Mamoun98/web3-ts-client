import React, { useEffect, useState } from "react";
import { Box, Flex } from "../../components/containers";
import { usePromise } from "../../hooks/usePromise";
import { getGreeterValue, setGreeting } from "../../services/greeter";
import { getWallet } from "../../services/web3";
import theme from "../../styles/theme";
import { contractReader } from "../../utils/contracts";

export default function Home() {
  const [value, setValue] = useState("");
  const [_getWallet, wallet] = usePromise(getWallet, { showError: true });
  const [_getGreeterValue, gretterValue] = usePromise(getGreeterValue, {
    initReq: true,
    showError: true,
  });

  const [_setGreeting, response, loading, error] = usePromise(setGreeting, {
    showError: true,
  });

  const handleChange = ({ target: { value: _value } }: any) => {
    setValue(_value);
  };

  const handleClick = () => {
    _setGreeting(value);
  };

  return (
    <>
      <Flex gap={theme.spacings.medium}>
        <button onClick={_getWallet}>Connect</button>
        <button onClick={handleClick} disabled={!value || loading}>
          {loading ? "Updating" : "Update"}
        </button>
        <input
          value={value}
          onChange={handleChange}
          placeholder="set Greeting"
        />
        {JSON.stringify({ response, loading, gretterValue, wallet })}
      </Flex>
    </>
  );
}
