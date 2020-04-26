const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/views'));
app.use(express.static('./public'));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')



//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));



//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));