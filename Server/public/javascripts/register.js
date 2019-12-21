function registerUser() {
  var data = $('form').serialize();
  data += '&public_address=' + window.web3.eth.accounts[0];
  $.post('register', data, function (documentId) {
    addUserToBC(documentId, $("input[name='name']").val())
  });
}
