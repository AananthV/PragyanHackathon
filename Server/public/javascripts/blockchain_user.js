var addUserToBC = function (user_id, user_name) {
	$.get('http://localhost:3000/artifacts/User.json', function (response) {
		const UserContract = window.web3.eth.contract(response.abi).at('0xc8fEb1931EB3b70F03e432745FCf45B2490c5F89');
		UserContract.setUser.sendTransaction(
			user_id,
			user_name, {
				from: web3.eth.accounts[0]
			},
			function (error, result) {
				console.log(result);
				if (typeof(result) != 'undefined')
					window.location = 'http://localhost:3000/registration_success/' + result;
				window.location = 'http://localhost:3000/dashboard';
			}
		);
	});
};