const express = require('express');
const BlogIdea = require('../models/BlogIdea');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newBlogIdea = new BlogIdea({ title, content, author });
        await newBlogIdea.save();
        res.status(201).json({ message: 'Blog idea submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting blog idea', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const blogIdeas = await BlogIdea.find();
        res.json(blogIdeas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog ideas', error });
    }
});

module.exports = router;
