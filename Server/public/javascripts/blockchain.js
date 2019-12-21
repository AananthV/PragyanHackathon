window.addEventListener('load', function() {

  // Check if Web3 has been injected by the browser (Mist/MetaMask).
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3js = new Web3(web3.currentProvider);
    web3js.currentProvider.enable();
  } else {
    // Handle the case where the user doesn't have web3. Probably
    // show them a message telling them to install Metamask in
    // order to use the app.
    alert('Install Metamask');
    window.close();
  }

});
