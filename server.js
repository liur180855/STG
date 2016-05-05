var express = require('express');
var app = express();
var bodyParser = require('body-parser');
/*
// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
*/
app.use('/app', require('./controllers/app.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});
 
// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});