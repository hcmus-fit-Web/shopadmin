const mongoose = require('mongoose');

const url  = "mongodb+srv://saoko4:25052001@cluster0.yjd36.mongodb.net/shopadmin?authSource=admin&replicaSet=atlas-ct2p9r-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(url,{useNewUrlParser:true},(err)=>{

    if(!err){
        console.log("Success");
    }else{console.log("Fail");}


})

require('./task.model');