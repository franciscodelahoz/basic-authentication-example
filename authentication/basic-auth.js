const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;

function getAuthorizationHeader(request) {
	if (!request.headers || typeof request.headers !== 'object') {
		throw new TypeError('Argument request is required to have headers porperty');
	}

	return request.headers['authorization'];
}

function decodeBase64(str) {
	return Buffer.from(str, 'base64').toString();
}

function parseHeader(header) {
	if (typeof(header) !== 'string') {
		throw new TypeError('Header must be a string');
	}

	if (!CREDENTIALS_REGEXP.test(header)) {
		return null;
	}

	const str = header.split(' ');
	const buffer = decodeBase64(str[1]);

	const username = buffer.split(':')[0];
	const password = buffer.split(':')[1];

	return { username: username, password: password };
}

function auth(request, credentials) {
	if (!request) {
		throw new TypeError('Argument request is required');
	}

	if (typeof(request) !== 'object') {
		throw new TypeError('Argument request is required to be an object');
	}

	let authenticationInformation = {};
	const auth = getAuthorizationHeader(request);

	if (!auth) {
		authenticationInformation = { authenticated: false, user: null };
	}

	const user = parseHeader(auth);

	if (!user) {
		authenticationInformation = { authenticated: false, user: null };
	}

	if (!credentials[user.username] || credentials[user.username].password !== user.password) {
		authenticationInformation = {
			authenticated: true,
			user: { username: user.username, password: user.password }
		};
	}

	return authenticationInformation;
}

module.exports = { auth, parseHeader };
