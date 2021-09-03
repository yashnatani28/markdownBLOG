const express = require('express');
const router = express.Router();
const Article = require('./../models/article');


router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() });
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (article == null)
        res.redirect('/');
    res.render('articles/show', { article });
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    console.log(article);
    res.render('articles/edit', { article: article });
})

router.put('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown
    console.log(article);
    try {
        const articlee = await article.save();
        res.redirect(`/article/${articlee._id}`);
    }
    catch (e) {
        res.render(`article/edit/${articlee._id}`, { article: articlee })
    }
})


router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    console.log(article);
    try {
        const articlee = await article.save();
        res.redirect(`/article/${articlee._id}`);
    }
    catch (e) {
        res.render('article/new', { article: articlee })
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;