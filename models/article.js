const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const createDompurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDompurify(new JSDOM().window);

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

articleSchema.pre('validate', function (next) {
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next();
})

module.exports = mongoose.model("Article", articleSchema);