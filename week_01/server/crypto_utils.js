const {keccak256} = require("ethereum-cryptography/keccak");
const secp = require("ethereum-cryptography/secp256k1");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    return keccak256(Uint8Array.from(message));
}

/** 
 * Retrieve public key from signature
 * @param message - message 
 * @param signature - the signature in UInt8Array format
 * @param recoveryBit - the recoveryBit as number
 * @return the public key
 * 
*/

function retrievePubKeyFromSignature(message, signature, recoveryBit) {
    console.log(typeof(signature));
    console.log(signature);
    return toHex(secp.recoverPublicKey(hashMessage(message), hexToBytes(signature), recoveryBit));
}

module.exports = {retrievePubKeyFromSignature};