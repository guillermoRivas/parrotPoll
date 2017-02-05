var mongoose = require('mongoose');
var gracefulShutdown;

//desarrollo
var dbURI = 'mongodb://localhost:27017/parrotPoll';
//produccion
//var dbURI = 'mongodb://dbAdmin:password@ds054118.mlab.com:54118/parrotpoll';


mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

//  APP TERMINATION / RESTART EVENTS
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// nodemon restart
// para desarrollo
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// app termination
// todos los entornos
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// Heroku app termination
// para desconexiones en produccion
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// Modelos
require('./poll');
require('./user');
require('./pollResult');
require('./invitation');
