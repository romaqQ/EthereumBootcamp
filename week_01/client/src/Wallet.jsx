import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';
import getAddress from '../scripts/generate';
import wallet from "./accounts";

function Wallet({ address, setAddress, account, setAccount, balance, setBalance, ethAddress, setEthAddress }) {
  async function onChange(evt) { 
    const selectedAccount = evt.target.value;
    setAccount(selectedAccount);

    if (selectedAccount) {
      const privateKey = wallet.getPrivateKey(selectedAccount.toLowerCase());
      const address_uint8arr = secp.getPublicKey(privateKey);
      const address = toHex(address_uint8arr);
      setAddress(address);
      const ethAddress = toHex(getAddress(address_uint8arr));
      setEthAddress(ethAddress);

      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Account
        <select onChange={onChange} value={account}>
          <option value=""> Choose an account wallet </option>
          {Array.from(wallet.accounts.keys()).map((u,i) => (
            <option key={i} value={u.hash}>
              {u}
            </option>
          ))
          }
        </select>
       {/*<input placeholder="Choose ny of the available accounts: Alice, Bob, Chris" value={account} onChange={onChange}></input>*/}
      </label>

      <div>
        Public Key (first 20 places): {address.slice(0,20)} ... 
      </div>
      
      <div>
        Eth Address: 0x{ethAddress}
      </div>


      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
