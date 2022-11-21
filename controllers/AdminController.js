
const db = require('../models/dbOperations');

class AdminController {

    dashboard(req, res) {
        res.render('dashboard', {});
    }
}

module.exports = new AdminController();