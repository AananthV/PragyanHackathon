var addUserToBC = function(user_id, user_name) {
	$.get('http://localhost:3000/artifacts/User.json', function(response) {
		const UserContract = window.web3.eth.contract(response.abi).at('0x839e8A067D7ECbBC8DcA096abAa75e78b88d6275');
		UserContract.setUser.sendTransaction(
			user_id,
			user_name,
			{
				from : web3.eth.accounts[0]
			},
			function(error, result) {
				console.log(result);
				window.location = 'http://localhost:3000/registration_success/' + result;
			}
		);
	});
};
