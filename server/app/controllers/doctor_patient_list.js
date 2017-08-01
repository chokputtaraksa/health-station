var Patient = require('../models/patient');
var DPList = require('../models/doctor_patient_list');

// exports.add2List = function(req, res, next){
//     var info = req.body;
//     // var authen =  req.headers['authentication'];
//     if()
// }

// exports.register = function(req, res, next){ // register 
//     var info = req.body;
//     var type = req.headers['register-type'];
//     var idNumber = info.idNumber;
//     if(!idNumber){
//         // console.log("mai mee id number");
//         return res.status(422).send({error: 'Missing Id number'}); 
//     }
//     if(type=="idcard"){
//         if(info.thaiFullName && info.engFullName && info.birthOfDate && info.address && info.idNumber && info.gender){
//             User.findOne({idNumber: idNumber}, function(err, existingUser){
//                 if(err){
//                     // console.log(err);
//                     return next(err);
//                 }
        
//                 if(existingUser){
//                     // console.log("mee u law");
//                     return res.status(422).send({error: 'this id number is already exist'});
//                 }
                
//                 var user = new User({
//                     id_card:{
//                         thaiFullName : info.thaiFullName,
//                         engFullName : info.engFullName,
//                         birthOfDate : info.birthOfDate,
//                         address : info.address,
//                         idNumber : info.idNumber,
//                         gender: info.gender
//                     },
//                     role : info.role
//                 });
        
//                 user.save(function(err, user){
        
//                     if(err){
//                         return next(err);
//                     }
        
//                     var userInfo = setUserInfo(user);
        
//                     res.status(201).json({
//                         token: 'JWT ' + generateToken(userInfo),
//                         user: userInfo
//                     })
        
//                 });
//             })
//         }else{
//             return res.status(406).send({error : 'Missing field in json'});
//         }
//     }else{
//         return res.status(422).send({error: 'Missing Register-Type'});
//     }
// }