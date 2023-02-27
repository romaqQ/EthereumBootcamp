import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import wallet from "./accounts";
import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ account, setBalance }) {

  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    console.log(sendAmount);
    const msg = {
      amount: parseInt(sendAmount),
      recipient,
    };
    console.log(msg);
    const msg_hash = keccak256(Uint8Array.from(msg));
    const [sig, recoveryBit] = await secp.sign(msg_hash, wallet.getPrivateKey(account), {
      recovered: true,
    });
    const signature = toHex(new Uint8Array([...sig]));
    const transaction = {
      msg, 
      signature,
      recoveryBit
    };

    try {
      const {
        data: { balance },
      } = await server.post(`send`, transaction);
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      <h3>Sending transaction from {account}</h3>
      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 043..."
          value={recipient}
          onChange={setValue(setRecipient)}></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
