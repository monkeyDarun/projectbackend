const mongoose = require('mongoose');

const blogIdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const BlogIdea = mongoose.model('BlogIdea', blogIdeaSchema);

module.exports = BlogIdea;
