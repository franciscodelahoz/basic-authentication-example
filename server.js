const http = require('http');
const { auth } = require('./authentication/basic-auth');

const credentias = {
	username: {
		password: 'password'
	},
	admin: {
		password: 'admin'
	}
};

http.createServer(function(request, response) {
	const isAuthenticated = auth(request, credentias);

	if (!isAuthenticated.authenticated) {
		response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
		response.statusCode = 401;
		return response.end('Access denied');
	} else {
		response.end(`Welcome ${isAuthenticated.user.username}!`);
	}

}).listen(3000);
