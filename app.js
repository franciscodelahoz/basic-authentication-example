const express = require('express');
const app = express();
const auth = require('./modules/auth');

app.set('port', 4000);

app.use(auth);

app.use('/', function(req, res) {
	res.send('Welcome!');
});

app.listen(app.get('port'), function() {
	console.log(`The Server is listening on the port ${app.get('port')}`);
});
