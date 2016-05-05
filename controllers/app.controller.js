var express = require('express');
var router = express.Router();
 /*
// use session auth to secure the angular app files
router.use('/', function (req, res, next) {
	/*
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }
 	
    next();
});
*/
// serve angular app files from the '/app' route
router.use('/', express.static('app'));
 
module.exports = router;