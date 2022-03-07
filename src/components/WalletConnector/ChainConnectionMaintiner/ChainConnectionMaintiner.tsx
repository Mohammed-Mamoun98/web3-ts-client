import React, { useEffect, useState } from "react";
import { metamaskEvents } from "../../../constants/wallet";
import { setupMetamask } from "../../../utils/web3";
import config from "../../../config/develop.env.json";
import { usePromise } from "../../../hooks/usePromise";
import { changeChain } from "../../../services/wallet";

const { ethereum } = setupMetamask();

export default function ChainConnectionMaintiner() {
  const { chainId: targetedChain } = config;
  const [_changeChain] = usePromise(changeChain, { showError: true });
  const [currentChain, setCurrentChain] = useState(ethereum.networkVersion);

  useEffect(() => {
    ethereum.on(metamaskEvents.CHAIN_CHNAGED, (chainId: string) => {
      const parsedChainId = chainId.replaceAll("0x", "");
      console.log({ chainId, parsedChainId });
      setCurrentChain(parsedChainId);
    });
  }, []);

  useEffect(() => {
    if (targetedChain !== currentChain) _changeChain(targetedChain);
  }, [currentChain]);

  return <></>;
}
