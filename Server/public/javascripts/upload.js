function addDocument() {
    console.log(document_hash)
    console.log(window.web3.eth.accounts[0])
    window.web3.eth.sign(window.web3.eth.accounts[0], document_hash, function (error, result) {
        if (!error) {
            console.log(result)
            console.log("hi")
        }
        // console.log(err)
    })
}