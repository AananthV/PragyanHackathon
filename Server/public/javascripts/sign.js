function sendSign() {
    window.web3.eth.sign(window.web3.eth.accounts[0], "0x" + document_hash, function (error, result) {
        if (!error) {
            $.post('http://localhost:3000/signdoc', {
                hash: document_hash,
                signature: result
            }, function (err, resp) {
                addSignature("0x" + document_hash, result)
            })
        } else {
            console.log("yuck")
        }
    })
}