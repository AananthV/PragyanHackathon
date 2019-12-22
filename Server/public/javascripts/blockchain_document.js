// user 0x538db49a39b90Eb679534f648318dF0215DD493E
// doc 0xDaD9241dEc0BB929d471E15C6E960d0E2AF735E1

let addDocToBC = function(hash, signature) {
	$.get('http://localhost:3000/artifacts/DigitalSignature.json', function(response) {
		const DigitalSignature = window.web3.eth
			.contract(response.abi)
			.at('0x2c21c063A7FE059259f6c1F0e656c7E8Db8C0dAD');
		DigitalSignature.addDocument.sendTransaction(
			hash,
			signature,
			{
				from : window.web3.eth.accounts[0]
			},
			function(error, result) {
				console.log(result);
				if (typeof(result) != 'undefined')
					window.location = 'http://localhost:3000/upload_success/' + result;
				window.location = 'http://localhost:3000/dashboard';
			}
		);
	});
};

let addSignature = function(hash, signature) {
	$.get('http://localhost:3000/artifacts/DigitalSignature.json', function(response) {
		const DigitalSignature = window.web3.eth
			.contract(response.abi)
			.at('0x2c21c063A7FE059259f6c1F0e656c7E8Db8C0dAD');
		DigitalSignature.addSignature.sendTransaction(
			hash,
			signature,
			{
				from : window.web3.eth.accounts[0]
			},
			function(error, result) {
				console.log(result);
				if (typeof(result) != 'undefined')
					window.location = 'http://localhost:3000/sign_success/' + result;
				window.location = 'http://localhost:3000/dashboard';
			}
		);
	});
};
