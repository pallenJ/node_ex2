exports.isNotLoggedIn = (req,res,next)=>{
    if(req.user){
        console.log('already login');
        res.redirect('/');
    }else{
        next();
    }
}

exports.isLoggedIn = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        console.log('login please');
        res.redirect('/users/login');
    }
}
