
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    fathersName: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    standard: {
        type: Number,
        required: true,
    },
    contact: {
        type: String,
        trim: true,
        unique: true
    },
    address: {
        location:{
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,
        },
        pincode:{
            type: Number,
            required: true,
        },
    }
}, { timestamps: true });

userSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("Student", userSchema);
