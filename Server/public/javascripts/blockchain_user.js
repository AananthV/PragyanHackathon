var addUserToBC = function (user_id, user_name) {
  $.get('http://localhost:3000/artifacts/User.json', function (response) {
    const UserContract = window.web3.eth.contract(response.abi).at("0x1Ab4f96b15569562278C417Ded805a4007414Ed3");
    UserContract.setUser.sendTransaction(user_id, user_name, {
      from: web3.eth.accounts[0]
    }, function (error, result) {
      console.log(result);
    })
  })
}
// Doc 0xBC28FFFAa9d5BfEb74Bb5466500361513c888CC6
