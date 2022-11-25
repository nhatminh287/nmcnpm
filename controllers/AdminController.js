
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
}

module.exports = new AdminController();