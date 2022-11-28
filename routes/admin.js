const { Router } = require('express');
const express = require('express');
const route = express.Router();

const adminController = require('../controllers/AdminController');



route.get('/dashboard', adminController.dashboard);
route.get('/income', adminController.showIncome);
route.post('/incomeFilter', adminController.showIncomeFilter);

// Hiển thị trang đăng ký
route.get('/user', adminController.showUserRegister);

// Đăng ký thành viên. thêm dữ liệu vào db
route.post('/user/register', adminController.userRegister);

// Tra cứu thông tinh khách hàng
route.post('/usercheck', adminController.userCheck);

module.exports = route;