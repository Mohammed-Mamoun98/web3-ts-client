import React, { useEffect, useState } from "react";
import ShowAt from "../../hoc/ShowAt/ShowAt";
import { setupWeb3 } from "../../utils/web3";
import ChainConnectionMaintiner from "./ChainConnectionMaintiner/ChainConnectionMaintiner";

interface IWalletConnector {
  children: React.ReactElement;
}

export default function WalletConnector({ children }: IWalletConnector) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setupWeb3().then(() => setShow(true));
  }, []);

  return (
    <ShowAt at={show}>
      <ChainConnectionMaintiner />
      <>{children}</>
    </ShowAt>
  );
}
