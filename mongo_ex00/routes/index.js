var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.user));

  let message = null;
  if(req.session.messages){
    message = req.session.messages[0];
    delete req.session.messages;
  }
  res.render('main', {user:req.user||null, message});
});

module.exports = router;
 