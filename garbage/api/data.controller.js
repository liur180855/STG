var express = require('express');
var config = require('config.json');
var router = express.Router();
var dataService = require('services/data.service');
// routes
router.post('/postInfo', postInfo);
router.get('/getAllHousing', getAllHousing);

module.exports = router;

function postInfo(req, res) {
	console.log("in side data controller");
	dataService.create(req.body).then(function () {res.sendStatus(200);}).catch(function (err) {res.status(400).send(err);});
}

function getAllHousing(req, res) {
	console.log("in side data controller");
	dataService.getById(req.user.sub).then(function (user) {
		if (user) {
			res.send(user);
			} else {
				res.sendStatus(404);
				}
			}).catch(function (err) {
				res.status(400).send(err);
			});
}