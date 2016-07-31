var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');
var service = require('./authService');

exports.emailSignup = function(req, res) {
    var user = new User({
        // Creamos el usuario con los campos
        // que definamos en el Schema
        // nombre, email, etc...
    });

    user.save(function(err) {
        return res
            .status(200)
            .send({
                token: service.createToken(user)
            });
    });
};

exports.emailLogin = function(req, res) {
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
            res.status(200).json(undefined);
        }
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
                    callback(true);
                } else {
                    console.log(result);
                    callback(false);
                }
            });
        } else {
            console.log("usuario no encontrado");
            callback(false);
        }
    });
}

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userpassword, callback) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
    callback(passwordData.passwordHash, salt);
}

function comparePassword(reqPassword, passwor, salt, callback) {
    var result = false;
    var reqPasswordHash = sha512(reqPassword, salt);
    if (reqPasswordHash.passwordHash == passwor) result = true;
    callback(result);
}