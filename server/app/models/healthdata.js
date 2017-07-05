var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var healthDataSchema = new mongoose.Schema({
        uid : {
                type : String,
                require : true
        },
        type : {
                type : String
        },
        h_value : {
                type : Number
        },
        l_value : {
                type : Number
        },
        unit : {
                type : String
        },
        date_time : {
                type : Date,
                require : true
        }
},{
        timestamps: true
});
 
module.exports = mongoose.model('health_data', healthDataSchema);