exports.isNotLoggedIn = (req,res,next)=>{

    if(req.user){
        console.log('already login');
        //res.redirect('/');
        res.json(req.user);
    }else{
        next();
    }
}

exports.isLoggedIn = (req,res,next)=>{
    console.log('asdf:'+JSON.stringify(req.session));
    console.log('asdf:'+JSON.stringify(req.user));

    if(req.user){
        next();
    }else{
        console.log('login please');
        res.json({});
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
