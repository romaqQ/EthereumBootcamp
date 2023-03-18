const { keccak256 } = require('ethereum-cryptography/keccak');
const { bytesToHex } = require('ethereum-cryptography/utils');

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(Buffer.from).map(keccak256);
        this.concat = (left, right) => keccak256(Buffer.concat([left, right]));
    }

    getRoot() {
        return bytesToHex(this._getRoot(this.leaves));
    }

    _getRoot(leaves = this.leaves) {
        const leaves_len = leaves.length;
        if (leaves_len === 1) {
            return leaves[0];
        }
        const layer = [];
        const isEven = leaves % 2 === 0 ? true : false;
        const len_limit = isEven ? leaves_len : leaves_len -1;
        
        for (let i = 0; i < len_limit; i+=2) {
            layer.push(this.concat(leaves[i], leaves[i+1]));
        }
        if (!isEven){
            layer.push(leaves.slice(-1)[0]);
        }
        return this._getRoot(layer);
    }


}