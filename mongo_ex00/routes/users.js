var express = require('express');

const User = require('../schemas/user');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middleware');

var router = express.Router();

const postLogin = passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/',
  successMessage: `환영합니다`,
  failureMessage: '로그인에 실패했습니다', 
});



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

router.post('/login', isNotLoggedIn, postLogin);

router.get('/logout',isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/');
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


module.exports = router;
