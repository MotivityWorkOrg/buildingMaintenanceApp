var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./config/database');
var mongoose = require('mongoose');
var dbUrl = process.env.DB_URL || database.localUrl;
mongoose.connect(dbUrl);
var app = express();
app.set('port', process.env.PORT || 3001);


// view engine setup
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../client')));
//app.set('views', __dirname + '/views');
app.set('/views', express.static('views'));
//console.log('__dirname is  getting as >>>>>',__dirname, path.join(__dirname, '../client'));
//app.use('/favicon.ico', express.static('../client/img/favicon.ico'));
//For setting custom favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname + '.../public')));
// Configuring Passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/user/', routes);
//console.log(" asfjlkj asdfj ---------->    ", routes.isAuthenticated);
// building routes ======================================================================
require('./routes/routes.js')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        //console.log(" <<<< Here >>>>> ", err.status, res);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
var debug = require('debug')('passport-mongo');
var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
    console.log('Express server listening on port ' + server.address().port);
});
