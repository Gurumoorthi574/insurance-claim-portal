require('dotenv').config(); // Add this line at the very top

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/Signup');
var saveDataRouter = require('./routes/saveData');; // Ensure this route is defined
var claimStatusRouter = require('./routes/fetch/claim_status'); // Ensure this route is defined
var dashboardRouter = require('./routes/fetch/dashboard'); // Ensure this route is defined
var claimRouter = require('./routes/fetch/claim'); // Ensure this route is defined
var claimHistoryRouter = require('./routes/fetch/claim_history'); // Ensure this route is defined



var app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Set to your frontend's URL
  credentials: true, // Lowercase 'credentials'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/signup', signupRouter);
app.use('/api/saveData', saveDataRouter);
app.use('/api/fetch/claim_status', claimStatusRouter);
app.use('/api/fetch/dashboard', dashboardRouter);
app.use('/api/fetch/claim/by-policy', claimRouter);
app.use('/api/fetch/claim-history', claimHistoryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
