const { Router } = require('express');
const express = require('express');
const route = express.Router();

const adminController = require('../controllers/AdminController');



route.get('/dashboard', adminController.dashboard);
route.get('/income', adminController.showIncome);
route.post('/incomeFilter', adminController.showIncomeFilter);

module.exports = route;