var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');
var service = require('./authService');
var config = require('./config');

exports.signup = function(req, res) {
    var user = new User(req.body);

    saltHashPassword(user.password, function(passwordHash, salt) {
        user.password = passwordHash;
        user.passwordSalt = salt;
        user.save(function(err, user) {
            if (err) return res.status(500).send(err.message);
            return res
                .status(200)
                .send({
                    token: service.createToken(user)
                });
        });
    });
};

exports.login = function(req, res) {
    console.log('POST/login');
    console.log(req.body);

    loginfunction(req.body, function(result) {
        if (result) {
            User.findOne({
                'userName': req.body.userName
            }).exec(function(err, user) {
                if (err) return res.status(500).send(err.message);
                return res
                    .status(200)
                    .send({
                        token: service.createToken(user)
                    });
            });
        } else {
            return res.status(400).send("Bad Request");
        }
    });
};

exports.getActualUser = function(req, res) {
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);
    var id = mongoose.Types.ObjectId(payload.sub);
    User.findById(id, function(err, poll) {
        if (err) res.send(500, err.message);
        console.log('GET/userId');
        res.status(200).json(poll);
    });
};

function loginfunction(req, callback) {
    User.findOne({
        'userName': req.userName
    }).select('password passwordSalt').exec(function(err, user) {
        if (err) return res.status(500).send(err.message);
        if (user) {
            comparePassword(req.password, user.password, user.passwordSalt, function(result) {
                if (result) {
                    console.log(result);
                    return callback(true);
                } else {
                    console.log(result);
                    return callback(false);
                }
            });
        } else {
            console.log("usuario no encontrado");
             return callback(false);
        }
    });
}


var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal  */
        .slice(0, length); /** return number of characters */
};


var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword, callback) {
    var salt = genRandomString(16); /** salt length 16 */
    var passwordData = sha512(userpassword, salt);
    callback(passwordData.passwordHash, salt);
}

function comparePassword(reqPassword, passwor, salt, callback) {
    var result = false;
    var reqPasswordHash = sha512(reqPassword, salt);
    if (reqPasswordHash.passwordHash == passwor) result = true;
    callback(result);
}
