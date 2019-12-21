var addUserToBC = function (user_id, user_name) {
  $.get('artifacts/User.json', function (response) {
    const UserContract = new window.web3.eth.contract(response.abi).at("0x538db49a39b90Eb679534f648318dF0215DD493E");

    UserContract.setUser.sendTransaction(user_id, user_name, {
      from: web3.eth.accounts[0]
    }, function (error, result) {
      console.log(result);
    })
  })
}
// Doc 0xBC28FFFAa9d5BfEb74Bb5466500361513c888CC6