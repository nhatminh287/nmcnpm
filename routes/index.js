const siteRoute = require('./site');
// const productsRouter = require('./products');

const adminRoute = require('./admin');
//const customer = require('./customer'); 

function route(app) {
    
    app.use('/admin', adminRoute);
    //app.use('/customer', customer); 
    // app.use('/products', productsRouter);
    app.use('/', siteRoute);
}
module.exports = route;