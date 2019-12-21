function registerUser() {
  var data = $('form').serialize();
  console.log($('form').name)
  data += '&public_address=' + window.web3.eth.accounts[0];
  console.log(data);
  $.post('register', data, function (documentId) {
    addUserToBC(documentId, $('form').name)
  });
}