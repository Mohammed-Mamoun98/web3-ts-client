import React, { useEffect, useState } from "react";
import { usePromise } from "../hooks/usePromise";
import { getWallet } from "../services/web3";

export default function Child() {
  // const [account, setAccount] = useState(null);
  const [checkAccount, account, loading] = usePromise(getWallet);
  return (
    <div>
      <button onClick={checkAccount}>Check</button>{" "}
      {JSON.stringify({ account, loading })}
    </div>
  );
}
