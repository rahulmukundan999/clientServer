var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');

//console.log(process.argv[2]);

var app = express();

app.use(cookieParser());
app.use(bodyparser.json());
app.use(cookieParser('foo'));
//app.use(cors());


const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyparser.json());
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../client/dist/client')));
// passport config
app.use(session({
    secret: 'foo',
    saveUninitialized: true,
    resave: true
}));

mongoose.connection.on('connected', () => {
    console.log('Connected');
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error');
    }

});


app.get('/', (req, res) => {
    res.send('Connection Established');
});

app.listen(port, () => {
    console.log('server started');
});