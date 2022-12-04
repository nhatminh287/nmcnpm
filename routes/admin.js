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

// orderAsk
route.get('/orderAsk', adminController.orderAsk);


//order Membership
route.get('/orderMembership', adminController.orderMembership);

// check orderMembership
route.post('/checkOrderMembership', adminController.checkOrderMembership);

//orderList for membership
route.get('/orderList/:id', adminController.orderListMembership);

// product Detail for membership
route.get('/productDetail/:id/:masp', adminController.productDetailforMembership);

// add to Cart for membership
route.post('/addToCart/:id/:masp', adminController.addToCartMemberShip);

// payment for membership
route.get('/paymentMembership/:id', adminController.showPaymentMembership);

route.delete('/removeAllMembership', adminController.removeAllMembership);

// No membership
//orderList for no membership
route.get('/orderList', adminController.orderList);

// product Detail
route.get('/productDetail/:id', adminController.productDetail);

// add to Cart
route.post('/addToCart/:id', adminController.addToCart);

// thanhtoan
route.get('/payment', adminController.showPayment);

route.delete('/removeAll', adminController.removeAll)



module.exports = route;