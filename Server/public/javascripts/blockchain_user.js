var addUserToBC = function(user_id, user_name) {
  $.get('artifacts/User.json', function(response) {
    const UserContract = window.web3.eth.contract(response.abi).at("0xfD18c94162217b6DF78226632A55F9E08c082975");

    UserContract.setUser.sendTransaction(user_id, user_name, {from: web3.eth.accounts[0]}, function (error, result) {
      console.log(result);
    })
  })
}
// Doc 0xBC28FFFAa9d5BfEb74Bb5466500361513c888CC6
