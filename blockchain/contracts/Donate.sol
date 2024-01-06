// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Donate {
    mapping (address => address[]) donations;
    
    function egg(address _to) public payable returns(address) {
        require(msg.value == 0.01 ether);
        payable (_to).transfer(msg.value);
        donations[_to].push(msg.sender);

        return msg.sender;
    }

    function rocket(address _to) public payable returns(address) {
        require(msg.value == 0.02 ether);
        payable (_to).transfer(msg.value);
        donations[_to].push(msg.sender);

        return msg.sender;
    }

    function donation(address _streamer) view public returns (address[] memory) {
        return donations[_streamer];
    }
}