pragma solidity >=0.5.12 <0.6.0;

contract DigitalSignature {

    struct Document {
        address document_owner;
        mapping (address => bytes) signatures;
    }

    mapping (bytes32 => Document) public documents;

    function addDocument(bytes32 hash, bytes memory signature) public {
        require (verify(hash, signature));
        documents[hash].document_owner = msg.sender;
        documents[hash].signatures[msg.sender] = signature;
    }

    function addSignature(bytes32 hash, bytes memory signature) public {
        require (verify(hash, signature));
        documents[hash].signatures[msg.sender] = signature;
    }

    function verify(bytes32 hash, bytes memory signature) internal view returns (bool) {
      bytes32 r;
      bytes32 s;
      uint8 v;

    // Check the signature length
      if (signature.length != 65) {
        return false;
      }

      // Divide the signature in r, s and v variables with inline assembly.
      assembly {
        r := mload(add(signature, 0x20))
        s := mload(add(signature, 0x40))
        v := byte(0, mload(add(signature, 0x60)))
      }

      // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
      if (v < 27) {
        v += 27;
      }

      // If the version is correct return the signer address
      if (v != 27 && v != 28) {
        return false;
      }

      return ecrecover(hash, v, r, s) == msg.sender;
    }

}
