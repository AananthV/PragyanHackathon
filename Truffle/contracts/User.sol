pragma solidity >=0.4.25 <0.6.0;

contract User {

    sturct user {
        uint user_id;
        bytes32 name;
    }

    mapping (address => user) public users;

    function setUser(uint user_id, bytes32 name) public {
        users[msg.sender].user_id = user_id;
        users[msg.sender].name = name;
    }

}