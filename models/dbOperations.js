var config = require('./dbConfig');
const sql = require('mssql/msnodesqlv8');

async function verifyAdmin(username, password) {
    try {
        let pool = await sql.connect(config);
        console.log(username)
        let admin = await pool.request()
            .input('username', sql.VarChar(10), username)
            .input('password', sql.VarChar(100), password)
            .query("SELECT * FROM TaiKhoan WHERE MaTaiKhoan = @username and MatKhau = @password");
        if (admin.recordset.length == 0) return null;
        return admin.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function verifySignupMaNhanVien(manv) {
    try {
        let pool = await sql.connect(config);
        let nv = await pool.request()
            .input('manv', sql.VarChar(10), manv)
            .query("SELECT * FROM NhanVien WHERE MaNV = @manv");

        let tknv = await pool.request()
        .input('manv', sql.VarChar(10), manv)
        .query("SELECT * FROM TaiKhoan WHERE MaNV = @manv");
        if (nv.recordset.length == 0) return null;
        if (tknv.recordset.length != 0) return 1;
        return 2;
    }
    catch (error) {
        console.log(error);
    }
}

async function verifySignupTaiKhoan(username) {
    try {
        let pool = await sql.connect(config);
        let tk = await pool.request()
            .input('usename', sql.VarChar(10), username)
            .query("SELECT * FROM TaiKhoan WHERE MaTaiKhoan = @username");
        if (tk.recordset.length == 0) return null;
        return tk.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
// Đăng ký tài khoản
async function addNewAccount(maNV, username, password) {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        request.input('MaNV', sql.VarChar(10), maNV);
        request.input('username', sql.VarChar(10), username);
        request.input('password', sql.VarChar(100), password);
        try {
            await request.query("insert into TaiKhoan (MaTaiKhoan,MaNV,MatKhau) values (@username,@maNV,@password)");
            console.log('Đăng ký thành công');
            return 1;
        } catch (error) {
            console.log(error);
            return 0;
        }
    } catch (error) {
        console.log(error);
        return 0;
    }
}

// Lấy thông tin nhân viên
async function getUserInfoByManv(manv) {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        request.input('manv', sql.VarChar(10), manv);
        let nhanvien = await request.query('SELECT * FROM NHANVIEN WHERE MaNV = @manv');
        if (nhanvien.recordset.length == 0) return null;
        return nhanvien.recordset;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

//  Tống số hàng hóa còn tồn trong kho
async function getSumProducts() {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        let products = await request.query('SELECT sum(SoLuongTonKho) as sum FROM HANGHOA');
        if (products.recordset.length == 0) return null;
        return products.recordset;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

//
async function getSumOrders() {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        let products = await request.query('SELECT count(*) as SumOrders FROM DONMON');
        if (products.recordset.length == 0) return null;
        return products.recordset;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

async function getSumCustomers() {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        let customers = await request.query('SELECT count(*) as SumCustomers FROM THE_THANHVIEN');
        if (customers.recordset.length == 0) return null;
        return customers.recordset;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

// Tổng doanh thu
async function getSumRevenue() {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();
        let doanhthu = await request.query('SELECT sum(DoanhThu) as sum FROM DOANHTHU_BANHANG_THEONGAY');
        if (doanhthu.recordset.length == 0) return null;
        return doanhthu.recordset;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

async function getRecentOrder() {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request()
            .query(`SELECT TOP 8 kh.TenKH, dm.TongTien, ht.TenHT, lkh.TenLoai 
            FROM DONMON dm, HT_THANHTOAN ht, KHACHHANG kh, LOAI_KHACHHANG lkh
            WHERE dm.HT_THANHTOAN = ht.MAHT AND dm.MAKH = kh.MAKH and kh.LOAIKH = lkh.MALOAI`);
        return orders.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

// Lấy tất cả các đơn hàng
async function getOrder() {
    try {
        let pool = await sql.connect(config);
        let orders = await pool.request()
            .query(`SELECT kh.TenKH, dm.TongTien, ht.TenHT, lkh.TenLoai 
            FROM DONMON dm, HT_THANHTOAN ht, KHACHHANG kh, LOAI_KHACHHANG lkh
            WHERE dm.HT_THANHTOAN = ht.MAHT AND dm.MAKH = kh.MAKH and kh.LOAIKH = lkh.MALOAI`);
        return orders.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
// Hiển thị income, truyền vào tham số là ngày bắt đầu và ngày kết thúc
async function incomeFilter(start, end){
    try {
        let pool = await sql.connect(config);
        let incomes = await pool.request()
            /* .input('start', sql.VarChar(10), start)
            .input('end', sql.VarChar(10), end) */
            .query(`select dm.NgayLap, sp.TenSP, ht.TenHT, ct.ThanhTien
            from DONMON dm, HT_THANHTOAN ht, CHITIET_DONMON ct, SANPHAM_TIEUTHU sp, KHACHHANG kh
            where dm.HT_ThanhToan = ht.MaHT and dm.MaDon = ct.MaDon and ct.MaSP = sp.MaSP and dm.MaKH = kh.MaKH
            and (dm.NgayLap between '${start}' and '${end}')
            `);
        return incomes.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
// Hiển thị tất cả income
async function income(){
    try {
        let pool = await sql.connect(config);
        let incomes = await pool.request()
            .query(`select dm.NgayLap, sp.TenSP, ht.TenHT, ct.ThanhTien
            from DONMON dm, HT_THANHTOAN ht, CHITIET_DONMON ct, SANPHAM_TIEUTHU sp, KHACHHANG kh
            where dm.HT_ThanhToan = ht.MaHT and dm.MaDon = ct.MaDon and ct.MaSP = sp.MaSP and dm.MaKH = kh.MaKH     
            `);
        return incomes.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function addNewUser(id, name, type, idCard, manv) {
    try {
        let pool = await sql.connect(config);
        const count = await pool.request()
        .query(`exec ThemKhachHangThanhVien '${id}', '${name}', '${type}', '${idCard}', '${manv}'`);

        var check = count.rowsAffected[0]
        
        if (check == 1) return 1;
        return 0;
    }
    catch (error) {
        console.log(error);
    }
}

async function userCheck(id, idCard) {
    try {
        let pool = await sql.connect(config);
        const user = await pool.request()
        .query(`select kh.TenKH, kh.LoaiKH from KHACHHANG kh, THE_THANHVIEN tv where tv.MaThe = '${idCard}' and tv.MaKH = '${id}' and tv.MaKH = kh.MaKH`);
        return user.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    verifyAdmin,
    verifySignupMaNhanVien,
    verifySignupTaiKhoan,
    addNewAccount,
    getUserInfoByManv,
    getSumProducts,
    getSumOrders, 
    getSumCustomers,
    getSumRevenue,
    getRecentOrder,
    getOrder,
    incomeFilter,
    income,
    addNewUser,
    userCheck,
}