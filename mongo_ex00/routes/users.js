var express = require('express');

const User = require('../schemas/user');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const Article = require('../schemas/article');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  res.send('respond with a resource');
});

router.post('/register', isNotLoggedIn, async (req, res) => {

  const { userId, nick, password, password2 } = req.body;
  if (!nick) nick = userId;
  if (password !== password2) {
    res.status(400);
    res.send('password check');
  } else {
    try {
      const user = await User({ userId, nick });
      await User.register(user, password);
      passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/',
        successMessage: true,
        failureMessage: true, 
      })(req, res);
      //res.json(user);
    } catch (error) {
      console.error(error);
      res.send('register error');
    }
  }

});

router.get('/login', (req, res) => {
  res.send('login Page(GET)');
});

router.post('/login', isNotLoggedIn, passport.authenticate('local'),function (req,res) {  
  res.json(req.user);
});

router.get('/logout',isLoggedIn, (req, res) => {
  req.logout();
  res.json();
});

router.get('/userExist', async (req, res) => {
  const userId = req.query.userId;
  console.log('userId:', userId);
  try {
    
    let result = await User.findOne({ userId });
    console.log(JSON.stringify(result))
    res.send(result != null);
  } catch (error) {
    console.error(error);
    res.status(500); 
  }
});

router.get('/myArticles', async(req,res)=>{
  const article_list = await Article.find({_creator:req.user._id});
  res.json(article_list)
})

router.get('/articles/:id',async(req,res)=>{
  const user_id = (await User.findOne({userId:req.params.id},{_id:true}))._id;
  await Article.find({_creator:user_id})
    .populate('_creator')
      .exec((err,data)=>{res.json(data)});

})

router.get('/myInfo',isLoggedIn,async(req,res)=>{
  
  res.json(req.user);
});

module.exports = router;
