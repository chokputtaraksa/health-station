var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var UserSchema = new mongoose.Schema({
    id_card:{
        thaiFullName : {
            type: String
        },
        engFullName : {
            type: String
        },
        birthOfDate : {
            type: String
        },
        // religion :{
        //     type: String
        // },
        address : {
            type: String
        },
        idNumber : {
            type: String,
            unique: true,
        },
        gender: {
            type: String
        }
    },
    finger_print : {
        key1 : {
            type: String
        },
        key2 : {
            type: String
        }
    },
    role : {
        type: String,
        enum: ['doctor', 'patient'],
        default: 'patient'
    }
},{
        timestamps: true
});
 
module.exports = mongoose.model('Id_User', UserSchema);