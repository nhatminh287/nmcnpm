const { Router } = require('express');
const express = require('express');
const route = express.Router();

const siteController = require('../controllers/SiteController');

route.post('/verifyAdmin',siteController.verifyAdmin);
route.get('/', siteController.login);
route.get('/signup', siteController.signup);

module.exports = route;