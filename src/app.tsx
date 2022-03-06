import React, { useEffect } from "react";
import Child from "./components/child";
import Router from "./router";
import { setupWeb3 } from "./utils/web3";

setupWeb3();
export default function App() {
  return (
    <>
      <Router />
    </>
  );
}
