const express = require('express');
const app = express();
const path = require('path');
const route = require('./routes/index');
const port = 3000;
const handlebars = require('express-handlebars');
const sql = require('mssql/msnodesqlv8');
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

const hbs = handlebars.create({defaultLayout: false, extname: '.hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());



//Init routes
route(app);

app.listen(port, () => {
    
    console.log(`App listening at http://localhost:${port}`)
})
