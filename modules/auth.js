const credentials = { 'username': { password: 'password' }, 'admin': { password: 'admin' } };

module.exports = function(request, response, next) {
	var auth = request.headers['authorization'];

	if (!auth) {
		response.set('WWW-Authenticate', 'Basic realm="Secure Area"');
		return response.status(401).send('Access denied');
	}

	const str = auth.split(' ');
	const buffer = new Buffer.from(str[1], 'base64').toString();

	const username = buffer.split(':')[0];
	const password = buffer.split(':')[1];

	if (!credentials[username] || credentials[username].password !== password) {
		response.set('WWW-Authenticate', 'Basic realm="Secure Area"');
		return response.status(401).send('Access denied');
	}

	return next();
}
