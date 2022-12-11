var moment = require('moment');

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
                return accumulator + object.GiaBan;
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
                return accumulator + object.GiaBan;
              }, 0);
              
            res.render('admin/Income', {income: income, sum: sum})
        }
        catch (err) {
            console.log(err);
        }
    }

    async showUserRegister(req, res) {
        try {
            res.render('admin/User');
        }
        catch (err) {
            console.log(err);
        }
    }

    async userRegister(req, res) {
        try {
            const name = req.body.name;
            const id = req.body.id;
            const type = req.body.type;
            const idCard = req.body.idCard;
            const user = req.session.user;
            const manv = user[0].MaNV;
            let result = "Thêm thành công!"
            const add = await db.addNewUser(id, name, type, idCard, manv)
            
            if (!add) {
                result = "Thêm thành viên thất bại! Mã khách hàng hoặc mã thẻ đã tồn tại"
            }
            
            res.render('admin/User', {result: result})
        }
        catch (err) {
            console.log(err);
        }
    }

    async userCheck(req, res) {
        try {
            const id = req.body.id;
            const idCard = req.body.idCard;
            let user = await db.userCheck(id, idCard);
            
            user = user[0];
            let result2 = ""
            if(!user){
                result2 = "Thẻ thành viên không tồn tại!"
                res.render('admin/User', {result2: result2});
                return;
            }
            res.render('admin/User', {TenKH: user.TenKH, type: user.LoaiKH, result2: result2});
        }
        catch (err) {
            console.log(err);
        }
    }

    async orderAsk(req, res) {
        try {
            
            res.render('admin/orderAsk');
        }
        catch (err) {
            console.log(err);
        }
    }

    async orderList(req, res) {
        try {
            const product = await db.product();
            // console.log(product);
            // console.log(product[0]);
            res.render('admin/orderList', {product: product});
        }
        catch (err) {
            console.log(err);
        }
    }
    async orderListMembership(req, res) {
        try {
            const product = await db.product();
            const id = req.params.id;
            
            res.render('admin/orderListMembership', {product: product, id: id});
        }
        catch (err) {
            console.log(err);
        }
    }

    async orderMembership(req, res) {
        try {
            const product = await db.product();
            res.render('admin/orderMembership');
        }
        catch (err) {
            console.log(err);
        }
    }

    //Hiển thị chi tiết sản phẩm
    async productDetail(req, res) {
        try {
            const id = req.params.id;
            const productDetail = await db.getProductFromId(id);
            // console.log("detail là", productDetail);
            res.render('admin/productDetail', {productDetail: productDetail[0]});
        }
        catch (err) {
            console.log(err);
        }
    }

    async showPayment(req, res) {
        try {
            // select chitietgiohang
            const giohang = await db.getCart('0')
            console.log("gio hang recordset", giohang);
            let sum = giohang
            let phisanpham = 0;
            sum.forEach(function (item, index) {
                phisanpham += item.GiaTien * item.SoLuong;
            });
            res.render('admin/thanhtoan', {giohang: giohang, phisanpham: phisanpham});
        }
        catch (err) {
            console.log(err);
        }
    }

    async showPaymentMembership(req, res) {
        try {
            const makh = req.params.id;
            
            // select chitietgiohang
            const giohang = await db.getCart(makh)
            let sum = giohang
            let phisanpham = 0;
            sum.forEach(function (item, index) {
                phisanpham += item.GiaTien * item.SoLuong;
            });
            const discount = phisanpham - (phisanpham*5.0/100.0)
            res.render('admin/thanhtoanMembership', {giohang: giohang, id: makh, phisanpham: phisanpham, discount: discount});
        }
        catch (err) {
            console.log(err);
        }
    }

    // Thêm vào giỏ hàng đối với khách hàng không có thẻ thành viên
    async addToCart(req, res) {
        try {
            const id = req.params.id;
            const soluong = req.body.soluong;
            const productDetail = await db.getProductFromId(id);
            const add = await db.addTocart(id, soluong)
            if (!add) res.render('admin/productDetail/' + id, {productDetail: productDetail, status:"Thêm sản phẩm không thành công"})
            else
            res.redirect('/admin/orderList');
        }
        catch (err) {
            console.log(err);
        }
    }

    async orderMembership(req, res) {
        try {
            res.render('admin/orderMembership');
        }
        catch(err) {
            console.log(err);
        }
    }
    // nhập thông tin khách hàng thành viên để mua sản phẩm
    async checkOrderMembership(req, res) {
        try {
            const id = req.body.id;
            const idCard = req.body.idCard;
            const product = await db.product();                     
            let user = await db.userCheck(id, idCard);
            
            user = user[0];
            let result2 = ""
            if(!user){
                result2 = "Thẻ thành viên không tồn tại!"
                res.render('admin/orderMembership', {result2: result2});
                return;
            }
            res.redirect('/admin/orderList/' + id)
        }
        catch(err) {
            console.log(err);
        }
    }

    //Thêm vào giỏ hàng đối với khách hàng có thẻ thành viên
    async addToCartMemberShip(req, res) {
        try {
            const id = req.params.id;
            const masp = req.params.masp;
            const soluong = req.body.soluong;
            const productDetail = await db.getProductFromId(id);
            const add = await db.addTocartMembership(id, masp, soluong)
            if (!add) res.render(`admin/productDetail/${id}/${masp}`, {productDetail: productDetail, status:"Thêm sản phẩm không thành công!"})
            else
            res.redirect('/admin/orderList/' + id);
        }
        catch (err) {
            console.log(err);
        }
    }

    async productDetailforMembership(req, res) {
        try {
            const id = req.params.id;
            const masp = req.params.masp;
            const productDetail = await db.getProductFromId(masp);
            // console.log("detail là", productDetail);
            res.render('admin/productDetailMembership', {productDetail: productDetail[0], id: id});
        }
        catch (err) {
            console.log(err);
        }
    }

    async removeAll(req, res) {
        try {
            
            const deleteCart = await db.removeAll();
            if (deleteCart) {
                res.redirect('admin/payment')
            }
            else {
                const giohang = await db.getCart('0')
                console.log("gio hang recordset", giohang);
                let sum = giohang
                let phisanpham = 0;
                sum.forEach(function (item, index) {
                    phisanpham += item.GiaTien * item.SoLuong;
                });
                res.render('admin/thanhtoan', {giohang: giohang, phisanpham: phisanpham, status: "Xoá sản phẩm không thành công!"});
            }
            res.render('admin/productDetailMembership', {productDetail: productDetail[0], id: id});
        }
        catch (err) {
            console.log(err);
        }
    }
    async removeAllMembership(req, res) {
        try {
            const makh = req.params.id;
            const deleteCart = await db.removeAllMembership(makh);
            if (deleteCart) {
                res.redirect('/admin/paymentMembership/' + makh)
                return;
            }
            else {
                const giohang = await db.getCart(makh)
                console.log("gio hang recordset", giohang);
                let sum = giohang
                let phisanpham = 0;
                sum.forEach(function (item, index) {
                    phisanpham += item.GiaTien * item.SoLuong;
                });
                res.render('admin/thanhtoanMembership', {giohang: giohang, phisanpham: phisanpham, status: "Xoá sản phẩm không thành công!"});
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    async payment(req, res) {
        try {
            const htThanhtoan = req.params.htThanhtoan
            const giohang = await db.getCart('0')
            let sum = giohang
            let phisanpham = 0;
            sum.forEach(function (item, index) {
                phisanpham += item.GiaTien * item.SoLuong;
            });
            const user = req.session.user;
            const manv = user[0].MaNV;
            // insert Don Hang
            await db.addDonHang('null', manv, phisanpham, htThanhtoan)
            
            giohang.forEach(function (item, index) {
                // thêm chi tiết đơn hàng
                db.addChiTietDonHang(item.MaSP, item.SoLuong, item.GiaTien);
                // Cập nhật lượng sản phẩm
                db.updateSanPham(item.MaSP, item.SoLuong)
            });
            res.redirect('/admin/orderList')
        }
        catch (err) {
            console.log(err);
        }
    }
    async paymentMembership(req, res) {
        try {
            const htThanhtoan = req.params.htThanhtoan
            const makh = req.params.makh;
            const giohang = await db.getCart(makh)
            let sum = giohang
            let phisanpham = 0;
            sum.forEach(function (item, index) {
                phisanpham += item.GiaTien * item.SoLuong;
            });
            const user = req.session.user;
            const manv = user[0].MaNV;
            // insert Don Hang
            await db.addDonHangMembership(makh, manv, phisanpham, htThanhtoan)
            
            giohang.forEach(function (item, index) {
                // thêm chi tiết đơn hàng
                db.addChiTietDonHang(item.MaSP, item.SoLuong, item.GiaTien);
                // Cập nhật lượng sản phẩm
                db.updateSanPham(item.MaSP, item.SoLuong)
            });
            res.redirect('/admin/orderList/' + makh)
        }
        catch (err) {
            console.log(err);
        }
    }

    async getProductPage(req, res) {
        try {
            res.render('admin/Product')
        }
        catch (err) {
            console.log(err);
        }
    }

    async import(req, res) {
        try {
           const id = req.body.id;
           const name = req.body.name;
           const soluong = req.body.soluong;
           const product = await db.getProduct(id, name);
            console.log(product);
           if(!product[0]) {
            let err = "Sản phẩm không hợp lệ!"
            res.render('admin/product', {status: err})
            return;
           }
           await db.importProduct(id, soluong);
           res.render('admin/product', {status: "Bạn đã nhập hàng thành công!"})
           return;
        }
        catch (err) {
            console.log(err);
        }
    }

    async export(req, res) { 
        try {
            const id = req.body.id;
            const name = req.body.name;
            const soluong = req.body.soluong;
            const product = await db.getProduct(id, name);
             console.log(product);
            if(!product[0]) {
             let err = "Sản phẩm không hợp lệ!"
             res.render('admin/product', {status: err})
             return;
            }
            await db.exportProduct(id, soluong);
            res.render('admin/product', {status: "Bạn đã xuất hàng thành công!"})
            return;
         }
         catch (err) {
             console.log(err);
         }
    }

    async importHistory(req, res){
        try{
            const importHistory = await db.importProductHistory()
            importHistory.forEach(function (item, index){

                item.NgayNhap = moment(item.NgayNhap).utc().format('YYYY-MM-DD')
            }
            )
            res.render('admin/importHistory',{import: importHistory})
            console.log( importHistory);
        }
        catch(err){
            console.log(err);
        }
    }

    async exportHistory(req, res){
        try{
            const exportHistory = await db.exportProductHistory()
            exportHistory.forEach(function (item, index){

                item.NgayXuat = moment(item.NgayXuat).utc().format('YYYY-MM-DD')
            }
            )
            res.render('admin/exportHistory',{export: exportHistory})
        }
        catch(err){
            console.log(err);
        }
    }

    async khohang(req, res){
        try{
            const khohang = await db.khohang()
            res.render('admin/khohang',{khohang: khohang})
        }
        catch(err){
            console.log(err);
        }
    }

    async help(req, res){
        try{
            
            res.render('admin/help')
        }
        catch(err){
            console.log(err);
        }
    }
}



module.exports = new AdminController();