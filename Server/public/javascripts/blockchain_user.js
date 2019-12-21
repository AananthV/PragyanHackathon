var addUserToBC = function(user_id, user_name) {
  $.get('artifacts/User.json', function(response) {
    const UserContract = new window.web3.eth.Contract(response.abi, "0xfD18c94162217b6DF78226632A55F9E08c082975");

    UserContract.methods.setUser(user_id, user_name).send()
  })
}
// Doc 0xBC28FFFAa9d5BfEb74Bb5466500361513c888CC6
