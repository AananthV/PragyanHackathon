pragma solidity >=0.5.12 <0.6.0;

contract User {

    struct user {
        bytes12 user_id;
        bytes32 name;
    }

    mapping (address => user) public users;

    function setUser(bytes12 user_id, bytes32 name) public {
        users[msg.sender].user_id = user_id;
        users[msg.sender].name = name;
    }

}
