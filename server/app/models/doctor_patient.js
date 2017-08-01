var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
 
var DoctorPatientList = new mongoose.Schema({
    patient_id : String,
    doctor_id : String,
    patient_agreement : Boolean,
    doctor_agreement : Boolean,
},{
        timestamps: true
});
 
module.exports = mongoose.model('doctor_patient_agreement', DoctorPatientList);