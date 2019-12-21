// user 0x538db49a39b90Eb679534f648318dF0215DD493E
// doc 0xDaD9241dEc0BB929d471E15C6E960d0E2AF735E1

let addDocToBC = function (hash, signature) {
    $.get('artifacts/DigitalSignature.json', function (response) {
        const DigitalSignature = window.web3.eth.contract(response.abi).at("0xDaD9241dEc0BB929d471E15C6E960d0E2AF735E1");
        DigitalSignature.addDocument.sendTransaction(hash, signature, {
            from: window.web3.eth.accounts[0]
        }, function (error, result) {
            console.log(result);
        })
    })
}

let addSignature = function (hash, signature) {
    $.get('artifacts/DigitalSignature.json', function (response) {
        const DigitalSignature = window.web3.eth.contract(response.abi).at("0xDaD9241dEc0BB929d471E15C6E960d0E2AF735E1");
        DigitalSignature.addSignature.sendTransaction(hash, signature, {
            from: window.web3.eth.accounts[0]
        }, function (error, result) {
            console.log(result);
        })
    })
}