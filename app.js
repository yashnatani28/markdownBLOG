const express = require('express');
const app = express();
const path = require('path');
const articleRouter = require('./routes/article');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');

const dbUrl = 'mongodb://localhost:27017/blog';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)
app.use(methodOverride('_method'));




app.use('/article', articleRouter)


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles });
})

app.listen(3000, () => {
    console.log('Listining on Port 3000 :)');
})