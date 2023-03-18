// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./IWinContract.sol";

contract ProxyContract {
    address payable public owner;
    IWinContract private iWinContract;

    constructor(address _contractAddress) payable {
        owner = payable(msg.sender);
        iWinContract = IWinContract(_contractAddress);
    }
    
    modifier onlyOwner() {
        require(msg.sender==owner, "Only owner can execute this function");
        _;
    }

    function callToWin() onlyOwner public {
        iWinContract.attempt();
    }

    
}