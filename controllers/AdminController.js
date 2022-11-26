
const db = require('../models/dbOperations');

class AdminController {

    async dashboard(req, res) {
        const user = req.session.user;
        const manv = user[0].MaNV;
        console.log(user);
        let nhanvien = await db.getUserInfoByManv(manv);
        let inventory = await db.getSumProducts();
        let order = await db.getSumOrders();
        let customer = await db.getSumCustomers();
        let revenue = await db.getSumRevenue();
        const recentOrder = await db.getRecentOrder();
        res.render('admin/Dashboard', {
            HoTen: nhanvien[0].TenNV,
            TonKho: inventory[0].sum,
            TongDonHang: order[0].SumOrders,
            TongKhachHangThanhvien: customer[0].SumCustomers,
            TongDoanhThu: revenue[0].sum,
            recentOrder: recentOrder,
        });
    }

    async showIncome(req, res) {
        try {
            const income = await db.income();
            const sum = income.reduce((accumulator, object) => {
                return accumulator + object.ThanhTien;
              }, 0);
            
            res.render('admin/Income', {income: income, sum: sum})
        }
        catch (err) {
            console.log(err);
        }
    }

    async showIncomeFilter(req, res) {
        try {
            let startDate = req.body.startdate;
            let endDate = req.body.enddate;
            let stDateString= startDate.toString();
            let endDateString= endDate.toString();
            stDateString = stDateString.replace(/\-/g, '')
            endDateString = endDateString.replace(/\-/g, '')
            const income = await db.incomeFilter(stDateString, endDateString);
            const sum = income.reduce((accumulator, object) => {
                return accumulator + object.ThanhTien;
              }, 0);
              
            res.render('admin/Income', {income: income, sum: sum})
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AdminController();