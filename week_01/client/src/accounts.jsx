import {hexToBytes} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from 'ethereum-cryptography/secp256k1';


const accounts = new Map();
accounts.set('alice', hexToBytes("c186a9a9a3512e1466a79fe84319cf537627ff96615b5c59d3ba2664fd3429a0"));
accounts.set('bob', hexToBytes("9b20866d121d692eadfa685118888a67355b1b44a7043e93a0fc82bd92e7a409"));
accounts.set('chris', hexToBytes("7f1a9ec0b3b1f004e05d701d861066e71da10596a2773668db53723e3837875f"));

function getPrivateKey(account){
    if (!account) return null;
    return accounts.get(account);
}

const wallet = {
    getPrivateKey,
    accounts,
}

export default wallet;