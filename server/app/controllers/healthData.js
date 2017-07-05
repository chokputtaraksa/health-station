var Data = require('../models/healthdata');
var authConfig = require('../../config/auth');
var User = require('../models/user2');
var ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken'); 

exports.insertData = function(req, res, next){
        var doc = req.body;
        var user_id = req.headers['user_id'];
        if(!user_id){
                return res.status(400).send({error: 'Missing user id'});
        }
        User.findOne({_id: ObjectId(user_id)}, function(err, existingUser){
                var arr = {};
                if(err){
                        return next(err);
                }
        
                if(!existingUser){
                // console.log("mee u law");
                        return res.status(204).send({error: 'Can\'t find this user.'});
                }
                if(doc.body_temperature){
                        arr = {
                                uid : user_id,
                                h_value : doc.body_temperature.value,
                                unit : doc.body_temperature.unit,
                                type : "Temperature",
                                date_time : doc.effective_time_frame.date_time
                        }
                }else if(doc.systolic_blood_pressure && doc.diastolic_blood_pressure){
                        arr = {
                                uid : user_id,
                                h_value : doc.systolic_blood_pressure.value,
                                l_value : doc.diastolic_blood_pressure.value,
                                unit : doc.systolic_blood_pressure.unit,
                                type : "Bloodpressure",
                                date_time : doc.effective_time_frame.date_time
                        }
                }else if(doc.body_weight){
                        arr = {
                                uid : user_id,
                                h_value : doc.body_weight.value,
                                unit : doc.body_weight.unit,
                                type : "Weight",
                                date_time : doc.effective_time_frame.date_time
                        }
                }else if(doc.body_height){
                        arr = {
                                uid : user_id,
                                h_value : doc.body_height.value,
                                unit : doc.body_height.unit,
                                type : "Height",
                                date_time : doc.effective_time_frame.date_time
                        }
                }else if(doc.heart_rate){
                        arr = {
                                uid : user_id,
                                h_value : doc.heart_rate.value,
                                unit : doc.heart_rate.unit,
                                type : "Heartrate",
                                date_time : doc.effective_time_frame.date_time
                        }
                }else{
                        return res.status(422).send({error : 'Data schema error'});
                }
                // console.log(arr);
                var data = new Data({
                        uid : arr.uid,
                        h_value : arr.h_value,
                        l_value : arr.l_value,
                        unit : arr.unit,
                        type : arr.type,
                        date_time : arr.date_time
                })
                data.save(function(err, data){
                        if(err){
                                return next(err);
                        }
 
                        res.status(201).json({
                                error: false
                        })
 
                });
        });
}

exports.getLatestData = function(req, response, next){
        var user_id = req.headers['user_id'];
        // console.log(user_id);
        var remain = 5;
        data = {};
        findLatestData(user_id, "Heartrate", function(err, res){
                if(res){
                        data.heart_rate = res.h_value;
                        data.hr_unit = res.unit;
                        data.hr_date_time = res.date_time
                }
                remain--;
                if(remain == 0){
                        response.status(200).json(data);
                }
        });
        findLatestData(user_id, "Bloodpressure", function(err, res){
                if(res){
                        data.blood_pressure_h = res.h_value;
                        data.blood_pressure_l = res.l_value;
                        data.bp_unit =  res.unit;
                        data.bp_date_time = res.date_time;
                }
                remain--;
                if(remain == 0){
                        response.status(200).json(data);
                }
        });
        findLatestData(user_id, "Weight", function(err, res){
                if(res){
                        data.weight = res.h_value;
                        data.w_unit = res.unit;
                        data.w_date_time = res.date_time;
                }
                remain--;
                if(remain == 0){
                        response.status(200).json(data);
                }
        });
        findLatestData(user_id, "Height", function(err, res){
                if(res){
                        data.height = res.h_value;
                        data.h_unit = res.unit;
                        data.h_date_time = res.date_time;
                }
                remain--;
                if(remain == 0){
                        response.status(200).json(data);
                }
        });
        findLatestData(user_id, "Temperature", function(err, res){
                if(res){
                        data.temperature = res.h_value;
                        data.t_unit = res.unit;
                        data.t_date_time = res.date_time;
                }
                remain--;
                if(remain == 0){
                        response.status(200).json(data);
                }
        });
}

exports.findDataByType = function(req, res, next){
        var user_id = req.headers['user_id'];
        var period = req.headers['period'];
        var type = req.headers['type'];
        if(!user_id || !period || !type){
                res.status(400).json({error : "Missing require header"});
        }
        findDataByPeriod(user_id, type, period, function(err, resp){
                if(err){
                        res.status(204).json({error: "Can not find any data"})
                }
                res.status(200).json(resp);
        });
}

exports.findLatestDataByType = function(req, res, next){
        var user_id = req.headers['user_id'];
        var type = req.headers['type'];
        if(!user_id || !type){
                res.status(400).json({error : "Missing require header"});
        }
        findLatestData(user_id, type, function(err, docs){
                var data = {};
                if(!docs){
                        res.status(204).json({error:"Can't not find any data"});
                }else{
                        if(docs.type==="Heartrate"){
                                data['heart_rate'] = {
                                        "value" : docs.h_value,
                                        "unit" : docs.unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs.date_time
                                }
                        }else if(docs.type ==="Bloodpressure"){
                                data['systolic_blood_pressure'] = {
                                        "value" : docs.h_value,
                                        "unit" : docs.unit
                                }
                                data['diastolic_blood_pressure'] = {
                                        "value" : docs.l_value,
                                        "unit" : docs.unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs.date_time
                                }
                        }else if(docs.type ==="Temperature"){
                                data['body_temperature'] = {
                                        "value" : docs.h_value,
                                        "unit" : docs.unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs.date_time
                                }
                        }else if(docs.type ==="Weight"){
                                data['body_weight'] = {
                                        "value" : docs.h_value,
                                        "unit" : docs.unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs.date_time
                                }
                        }else if(docs.type ==="Height"){
                                data['body_height'] = {
                                        "value" : docs.h_value,
                                        "unit" : docs.unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs.date_time
                                }
                        }
                        res.status(200).json(data);
                }
        });
}

function findLatestData(user_id, type , callback){
        Data.findOne({"uid" : user_id,"type" : type}).sort({"date_time": -1}).limit(1).exec(function (err, data) {
                if (err) callback(handleError(err), null);
                // console.log(data);
                callback(null, data);
        })
}

function findDataByPeriod(user_id, type, period, callback){
        var start;
        var end;
        if(period == "week"){
                start = new Date();
                start.setDate(start.getDate()-start.getDay());
                end = new Date();
                end.setDate(end.getDate()+ (7-end.getDay()));
        }else if(period == "month"){
                start = new Date();
                start.setDaฃte(1);
                end = new Date();
                end.setDate(getDateInMonth(end.getFullYear(), end.getMonth()));
        }
        Data.find({"uid" : user_id, "type" : type, date_time : {$gt : start ,$lt : end}}, function(err, docs){
                arr = [];
                if(!docs){
                        callback({err:"Doesn't have those data"}, null);
                }
                for(index in docs){
                        var data = {};
                        if(docs[index].type==="Heartrate"){
                                data['heart_rate'] = {
                                        "value" : docs[index].h_value,
                                        "unit" : docs[index].unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs[index].date_time
                                }
                        }else if(docs[index].type ==="Bloodpressure"){
                                data['systolic_blood_pressure'] = {
                                        "value" : docs[index].h_value,
                                        "unit" : docs[index].unit
                                }
                                data['diastolic_blood_pressure'] = {
                                        "value" : docs[index].l_value,
                                        "unit" : docs[index].unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs[index].date_time
                                }
                        }else if(docs[index].type ==="Temperature"){
                                data['body_temperature'] = {
                                        "value" : docs[index].h_value,
                                        "unit" : docs[index].unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs[index].date_time
                                }
                        }else if(docs[index].type ==="Weight"){
                                data['body_weight'] = {
                                        "value" : docs[index].h_value,
                                        "unit" : docs[index].unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs[index].date_time
                                }
                        }else if(docs[index].type ==="Height"){
                                data['body_height'] = {
                                        "value" : docs[index].h_value,
                                        "unit" : docs[index].unit
                                }
                                data['effective_time_frame'] = {
                                        "date_time" : docs[index].date_time
                                }
                        }
                        arr.push(data);
                }
                callback(null, arr)
        });
}

function getDateInMonth(year ,month){
        return new Date(year, month, 0).getDate();
}
// exports.register2 = function(req, res, next){ // register 
//     var info = req.body;
//     var idNumber = info.idNumber;
//     if(!idNumber){
//         // console.log("mai mee id number");
//         return res.status(422).send({error: 'Missing Id number'}); 
//     }

//     User2.findOne({idNumber: idNumber}, function(err, existingUser){
//         if(err){
//             // console.log(err);
//             return next(err);
//         }
 
//         if(existingUser){
//             // console.log("mee u law");
//             return res.status(422).send({error: 'this id number is already exist'});
//         }
 
//         var user = new User2({
//             id_card:{
//                 thaiFullName : info.thaiFullName,
//                 engFullName : info.engFullName,
//                 birthOfDate : info.birthOfDate,
//                 address : info.address,
//                 idNumber : info.idNumber,
//                 gender: info.gender
//             }
//         });
 
//         user.save(function(err, user){
 
//             if(err){
//                 return next(err);
//             }
 
//             var userInfo = setUserInfo(user);
 
//             res.status(201).json({
//                 token: 'JWT ' + generateToken(userInfo),
//                 user: userInfo
//             })
 
//         });
//     })
// }