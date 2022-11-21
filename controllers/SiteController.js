
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
        res.send('Tài khoản này chưa được đăng ký');
        return;
    }

    login(req, res, next) {
        res.render('Login', {
            
        })
    }

    signup(req, res, next) {
        res.render('SignUp.hbs', { })
        console.log("Dang ky");
    }

}

module.exports = new SiteController();