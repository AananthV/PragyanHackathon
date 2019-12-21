function addDocument() {
    console.log(document_hash)
    console.log(window.web3.eth.accounts[0])
    window.web3.eth.sign(window.web3.eth.accounts[0], "0x" + document_hash, function (error, result) {
        if (!error) {
            console.log(result)
            addDocToBC("0x" + document_hash, result)
        } else {
            console.log("yuck")
        }
    })
}