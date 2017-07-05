var jwt = require('jsonwebtoken');  
// var User = require('../models/user');
var User2 = require('../models/user2');
var authConfig = require('../../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 1000
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        thaiFullName : request.id_card.thaiFullName,
        engFullName : request.id_card.engFullName,
        birthOfDate : request.id_card.birthOfDate,
        address : request.id_card.address,
        gender: request.id_card.gender
    };
}
 
exports.login = function(req, res, next){
    var userInfo = setUserInfo(req.user);
    // console.log(userInfo);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}

exports.register2 = function(req, res, next){ // register 
    var info = req.body;
    var idNumber = info.idNumber;
    if(!idNumber){
        // console.log("mai mee id number");
        return res.status(422).send({error: 'Missing Id number'}); 
    }

    User2.findOne({idNumber: idNumber}, function(err, existingUser){
        if(err){
            // console.log(err);
            return next(err);
        }
 
        if(existingUser){
            // console.log("mee u law");
            return res.status(422).send({error: 'this id number is already exist'});
        }
 
        var user = new User2({
            id_card:{
                thaiFullName : info.thaiFullName,
                engFullName : info.engFullName,
                birthOfDate : info.birthOfDate,
                address : info.address,
                idNumber : info.idNumber,
                gender: info.gender
            }
        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
    })
}
 
// exports.register = function(req, res, next){ // register 
//     var basicAuth = req.headers['authorization'];
//     var plain_auth = Buffer.from(basicAuth.substr(6, basicAuth.length-6), 'base64').toString();
//     var creds = plain_auth.split(':');
//     var email = creds[0];
//     var password = creds[1];
//     var role = req.body.role;
//     if(!email){
//         return res.status(422).send({error: 'You must enter an email address'});
//     }
 
//     if(!password){
//         return res.status(422).send({error: 'You must enter a password'});
//     }
 
//     User.findOne({email: email}, function(err, existingUser){
 
//         if(err){
//             return next(err);
//         }
 
//         if(existingUser){
//             return res.status(422).send({error: 'That email address is already in use'});
//         }
 
//         var user = new User({
//             email: email,
//             password: password
//         });
//         // console.log(user);
 
//         user.save(function(err, user){
 
//             if(err){
//                 return next(err);
//             }
 
//             var userInfo = setUserInfo(user);
//             // console.log(userInfo);
//             res.status(201).json({
//                 token: 'JWT ' + generateToken(userInfo),
//                 user: userInfo
//             })
 
//         });
 
//     });
// }
 
exports.roleAuthorization = function(roles){ // manage user role
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}