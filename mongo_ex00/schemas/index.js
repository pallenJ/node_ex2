const mongoose = require('mongoose');

module.exports = () =>{

    const connect = () => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true);
        }
        mongoose.connect('mongodb://pallenJ:pallenJMP@localhost:27017/admin',{dbName: 'user_data',
    },(error)=>{
        if(error){
            console.error('mongoDB connection error ',error);
        }else{
            console.log('mongoDB connection success');
        }
    });


    }
    connect();
    mongoose.connection.on('error',(error)=>{
        console.error('mongoDB connection error ',error);
    });

    mongoose.connection.on('disconnected',()=>{
        console.error('mongoDB disconnected. retry...');
        connect();
    });

    require('./user');
    
};