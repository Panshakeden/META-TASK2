// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ENS {
    struct User {
        address account;
        bytes32 name;
        string image;
    }
    mapping(address => User) user;
    mapping(bytes32 => User) userB;
    mapping(bytes32 => bool) isRegisteredName;
    mapping(address => bool) isRegisteredAddress;

    User[] userArray;

    event Registeration(
        address indexed sender,
        bytes32 indexed username,
        string image
    );
    event ManageAccount(bytes32 indexed username, string image, bool);

    function registarUser(
        bytes32 _name,
        string calldata _img
    ) public returns (bool successful) {
        require(!isRegisteredName[_name], "username already exist");

        User storage acct = user[msg.sender];

        User storage mapName = userB[_name];

        acct.name = _name;
        acct.account = msg.sender;
        acct.image = _img;

        mapName.name = _name;
        mapName.account = msg.sender;
        mapName.image = _img;
        isRegisteredName[_name] = true;
        isRegisteredAddress[msg.sender] = true;
        successful = true;

        userArray.push(acct);

        emit Registeration(msg.sender, _name, _img);
    }

    function getAllUsers()view external returns(User[]memory) {
        return userArray;
        
    }

    function getIsRgisteredAddress() external view returns(bool){
        return isRegisteredAddress[msg.sender];
    }
}