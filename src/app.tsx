import React, { useEffect, useState } from "react";
import Child from "./components/child";
import WalletConnector from "./components/WalletConnector/WalletConnector";
import Router from "./router";
import { setupWeb3 } from "./utils/web3";
const { _web3 } = window as any;

export default function App() {
  return (
    <WalletConnector>
      <Router />
    </WalletConnector>
  );
}
