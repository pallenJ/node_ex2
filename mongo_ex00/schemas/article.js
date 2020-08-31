const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const {Schema} = mongoose;

let connection = mongoose.createConnection('mongodb://pallenJ:pallenJMP@localhost:27017/admin'); 
autoIncrement.initialize(connection);
let currentDate = new Date();
currentDate.setTime(currentDate.getTime()+ 1000*60*60*9);

const articleSchema = new Schema({
    title :String,
    content: String,
    createdAt:{type:Date, default:currentDate},
    updatedAt:{type:Date, default:currentDate},
    deletedAt:{type:Date, default:currentDate},
    _creator :{type:Schema.Types.ObjectId, ref:'User'}
});

articleSchema.plugin(autoIncrement.plugin,'Article');

module.exports = mongoose.model('Article', articleSchema);