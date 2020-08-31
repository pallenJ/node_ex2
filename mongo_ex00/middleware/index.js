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

exports.isAdmin = (req,res,next) =>{
    if(req.user&&req.user.admin){
        next();
    }else{
        console.log('Lack of authority');
        res.redirect('/users/login');
    }
}
