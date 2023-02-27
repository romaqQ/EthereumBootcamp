const secp = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log(`private key: ${utils.toHex(privateKey)}`);

const publicKey = secp.getPublicKey(privateKey);
function getAddress(_publicKey) {
    const publicKey = _publicKey.slice(1,); // remove prefix
    const publicKey_hash = keccak256(publicKey);
    return publicKey_hash.slice(-20,);
}

console.log(`public key: ${utils.toHex(publicKey)}`);
console.log(`address: 0x${utils.toHex(getAddress(publicKey)).toLowerCase()}`);