import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");
  const [address, setAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        account={account}
        setAccount={setAccount}
        address={address}
        setAddress={setAddress}
        ethAddress={ethAddress}
        setEthAddress={setEthAddress}
      />
      <Transfer 
        account={account}
        setBalance={setBalance} 
      />
    </div>
  );
}

export default App;
