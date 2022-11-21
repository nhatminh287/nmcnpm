var config = require('./dbConfig');
const sql = require('mssql/msnodesqlv8');

async function verifyCustomer(username, password) {
    try {
        let pool = await sql.connect(config);
        console.log(username)
        let customer = await pool.request()
            .input('username', sql.VarChar(10), username)
            .input('password', sql.VarChar(100), password)
            .query("SELECT * FROM TaiKhoan WHERE MaTaiKhoan = @username and MatKhau = @password");
        if (customer.recordset.length == 0) return null;
        return customer.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    verifyCustomer,
}