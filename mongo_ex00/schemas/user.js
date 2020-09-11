const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const {Schema} = mongoose;

let currentDate = new Date();
currentDate.setTime(currentDate.getTime()+ 1000*60*60*9);

const userSchema = new Schema({
    userId:{
        type:String,
        required: true,
        unique: true,
    },
    nick:{
        type:String,
    },
    admin:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type: Date,
        default:currentDate,
    },
});
userSchema.plugin(passportLocalMongoose,{ 
    usernameField:'userId'
})
module.exports = mongoose.model('User' ,userSchema)