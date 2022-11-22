
const { password } = require('../models/dbConfig');
const db = require('../models/dbOperations');

class SiteController {

    async verifyAdmin(req, res, next) {
        const username = req.body.Username;
        const password = req.body.Password;
        const user = await db.verifyAdmin(username, password);
        if (user) {
            console.log('Đăng nhập thành công');
            req.session.user = user;
            req.session.cart = [];
            req.session.grandTotal = 0;
            res.redirect('/admin/dashboard');
            return;
        }
        console.log('Tài khoản không hợp lệ')
        res.render('Login', {error: "Tài khoản không hợp lệ"} )
        // res.send('Tài khoản này chưa được đăng ký');
        return;
    }

    login(req, res, next) {
        res.render('Login', {
            
        })
    }

    signup(req, res, next) {
        res.render('SignUp', { })
        console.log("Dang ky");
    }

    //[POST]/addAccount
    async addAccount(req, res, next) {
        const manv = req.body.manv;
        const username = req.body.username;
        const phone = req.body.password;
        let nhanvien = await db.verifySignupMaNhanVien(manv);
        let tk = await db.verifySignupTaiKhoan(username);
        if (nhanvien == null) {
            console.log("Mã nhân viên không tồn tại!");
            res.render('SignUp', {error: "Mã nhân viên không tồn tại!"})
            return;
        }
        if (nhanvien == 1) {
            console.log("Mã nhân viên đã có tài khoản!");
            res.render('SignUp', {error: "Mã nhân viên đã có tài khoản!"})
            return;
        }
        if (tk) {
            console.log("Tên tài khoản đã tồn tại")
            res.render('SignUp', {error: "Tên tài khoản đã tồn tại"})
            return;
        }
        const success = await db.addNewAccount(manv, username, password);
        if (success == 0) {
            console.log('Lỗi đăng ký');
            res.send('Lỗi đăng ký');
            return;
        }
        else {
            console.log("Đăng ký thành công!");
            res.redirect('/');
            return;
        }

    }

}

module.exports = new SiteController();