var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/////////////////////   Connection to db   //////////////////////////
const Sequelize = require('sequelize');
const connection = new Sequelize('dataBase_name', 'postgres','haslo', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
////////////////////  end connection ////////////////////////////////


  const User = connection.define('user',{
	  firstName: {
		type: Sequelize.STRING
	  },
	  lastName: {
		  type: Sequelize.STRING
	  }
  }) 
 /* 
  User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});*/
  
connection.sync().then(function(){ 
	User.findById(1).then(function(user) {
		console.log(user.dataValues);
	});
}); 

connection.sync({
	logging: console.log
});
////////////////////////////  email  //////////////////////
emailjs = require('emailjs');
var server 	= emailjs.server.connect({
    user:    "innovative.project@outlook.com",
    password:"password",
    host:	 "smtp-mail.outlook.com",
    tls: {ciphers: "SSLv3"}
});
var message	= {
    text:	"i hope this works",
    from:	"you <innovative.project@outlook.com>",
    to:		"someone <mail@gmail.com>, another <mail@gmail.com>",
    cc:		"else <mail@gmail.com>",
    subject:	"testing emailjs"
};

// send the message and get a callback with an error or details of the message that was sent
server.send(message, function(err, message) { console.log(err || message); });

module.exports = app;
