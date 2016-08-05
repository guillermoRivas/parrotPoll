var crypto = require('crypto');
var mongoose = require('mongoose');

var User = mongoose.model('User');

exports.findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) res.send(500, err.message);
        console.log('GET/users');
        res.status(200).json(users);
    });
};

exports.exixtUserByUserName = function(req, res) {
    var userName = req.params.userName;
    console.log('GET/user/exist/' + userName);
    User.find({
        userName: userName
    }).exec(function(err, user) {
        if (err) res.send(500, err.message);
        if (user.length > 0) {
            res.status(200).json({
                result: true
            });
        } else {
            res.status(200).json({
                result: false
            });
        }

    });
};

exports.exixtUserByEmail = function(req, res) {
    var email = req.params.email;
    console.log('GET/user/existEmail/' + email);
    User.find({
        email: email
    }).exec(function(err, user) {
        if (err) res.send(500, err.message);
        if (user.length > 0) {
            res.status(200).json({
                result: true
            });
        } else {
            res.status(200).json({
                result: false
            });
        }

    });
};

exports.addUser = function(req, res) {
    console.log('POST/user');
    console.log(req.body);
    var user = new User(req.body);
    saltHashPassword(user.password, function(passwordHash, salt) {
        user.password = passwordHash;
        user.passwordSalt = salt;
        user.save(function(err, user) {
            if (err) return res.status(500).send(err.message);
            res.status(200).json(user);
        });
    });
};

exports.updateUser = function(req, res) {
    console.log('PUT/user');
    console.log(req.body);
    var user = new User(req.body);
    var id = mongoose.Types.ObjectId(req.body._id);
    delete req.body['_id'];

    User.findOneAndUpdate({
        '_id': id
    }, req.body, {
        upsert: true
    }, function(err, us) {
        if (err) return res.status(500).send(err.message);
        res.status(200).json(us);
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
                res.status(200).json(user);
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
        if (user.password) {
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
            console.log(result);
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
