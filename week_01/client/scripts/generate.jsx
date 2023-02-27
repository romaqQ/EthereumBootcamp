import { keccak256 } from 'ethereum-cryptography/keccak';

function getAddress(_publicKey) {
    const publicKey = _publicKey.slice(1,); // remove prefix
    const publicKey_hash = keccak256(publicKey);
    return publicKey_hash.slice(-20,);
}

export default getAddress;