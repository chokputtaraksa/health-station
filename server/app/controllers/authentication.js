var jwt = require('jsonwebtoken');  
// var User = require('../models/user');
var User = require('../models/user');
var authConfig = require('../../config/auth');
var Role = require('../models/role');
 
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

exports.register = function(req, res, next){ // register 
    var info = req.body;
    var type = req.headers['register-type'];
    var idNumber = info.idNumber;
    if(!idNumber){
        // console.log("mai mee id number");
        return res.status(422).send({error: 'Missing Id number'}); 
    }
    if(type=="idcard"){
        if(info.thaiFullName && info.engFullName && info.birthOfDate && info.address && info.idNumber && info.gender){
            User.findOne({idNumber: idNumber}, function(err, existingUser){
                if(err){
                    // console.log(err);
                    return next(err);
                }
        
                if(existingUser){
                    // console.log("mee u law");
                    return res.status(422).send({error: 'this id number is already exist'});
                }
                
                var user = new User({
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
        }else{
            return res.status(406).send({error : 'Missing field in json'});
        }
    }else{
        return res.status(422).send({error: 'Missing Register-Type'});
    }
}
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