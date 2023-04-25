//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodeVerifier {
    address public admin;
    mapping(string => bool) public codeList;

    constructor() {
        admin = 0x4C46AAb1e14A2973b94f0CAF2f7B4AfEb0F3C7B4;
    }

    function addCode(string memory code) public {
        require(msg.sender == admin, "Only admin can add codes.");
        codeList[code] = true;
    }

    function verifyCode(string memory code) public view returns (bool) {
        return codeList[code];
    }
}