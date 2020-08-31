var express = require('express');

const Article = require('../schemas/article');
const { isLoggedIn, isNotLoggedIn } = require('../middleware');
const { ObjectId } = require('mongodb');

var router = express.Router();

router.post('/add',isLoggedIn,async(req,res)=>{
    const writer_id = req.user._id;
    const {title,content} = req.body;
    
    let article = new Article({
        title, content, _creator:writer_id
    })
    await article.save();
    res.send(article);
});

router.get('/myArticles', async(req,res)=>{
    const article_list = await Article.find({_creator:req.user._id});
    res.json(article_list)
})

router.get('/:id',async(req,res)=>{
    if(req.params.id == 'admin'&&!req.user.admin){
        res.send('권한부족');
    }
    const article_list = await Article.find({_creator:req.user._id});
    res.json(article_list)
})

router.patch('/:id',async(req,res)=>{

    const legacyArticle = await Article.findOne({_id:req.params.id});
    if(!req.user){
        res.send('로그인 먼저');
    }else if(!legacyArticle._creator.equals(req.user._id)){

        res.send('니가 쓴글 아님ㅋ');
    }else{
        let {title, content} = req.body;
        console.log(JSON.stringify(legacyArticle));
        title = title||legacyArticle.title;
        content = content||legacyArticle.content;
        
        const updatedArticle = await Article.update({_id:req.params.id},{title,content});
        res.json(updatedArticle);
    }
});

router.delete('/:id',async(req,res)=>{
    const articleInfo = await Article.findOne({_id:req.params.id},{title:1,content:1,_creator:1});
    if(!req.user){
        res.send('로그인 먼저')
    }else if(!articleInfo._creator.equals(req.user._id)){
        console.log(articleInfo._creator.equals(req.user._id));
        console.log(JSON.stringify(articleInfo));
        res.send('니가 쓴글 아님ㅋ')
    }/*else if(!req.body.password){
        res.send('pwd error');
    }*/else{
        const deletedArticle = await Article.remove({_id:req.params.id});
        res.json(deletedArticle);
    }

})

module.exports = router;