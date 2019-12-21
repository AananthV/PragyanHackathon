window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      console.log("Accounts exposed")
    } catch (error) {
      // User denied account access...
    }
  }
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

});
