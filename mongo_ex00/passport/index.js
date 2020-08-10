const User = require("../schemas/user");

module.exports = (passport)=>{
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}