const sql = require('mssql/msnodesqlv8');

const config = {
    
    options: {
        trustedConnection: true
    },
    
    server: "localhost",
    user: "sa",
    password: "1234",
    database: "canteenDB",
    DRIVER: "msnodesqlv8"
    
}

async function connect(){
    try {
        await sql.connect(config, function (err) {
            console.log('Kết nối thành công');
        });
        
    } catch (err) {
        console.log('Kết nối không thành công');
    }
}

module.exports = config;

