function sendSign() {
    window.web3.eth.sign(window.web3.eth.accounts[0], "0x" + document_hash, function (error, result) {
        if (!error) {
            console.log(result)
            addSignature("0x" + document_hash, result)
        } else {
            console.log("yuck")
        }
    })
}