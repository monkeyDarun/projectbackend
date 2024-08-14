const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string (replace with your own MongoDB Atlas connection string)
const mongoURI = 'mongodb+srv://727722euec023:Arun_123@cluster0.dwsez.mongodb.net/crud';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define a Mongoose schema and model for blog ideas
const blogIdeaSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const BlogIdea = mongoose.model('BlogIdea', blogIdeaSchema);

// API route to handle form submissions
app.post('/api/submit-idea', (req, res) => {
    const { title, author, content } = req.body;

    const newBlogIdea = new BlogIdea({
        title,
        author,
        content
    });

    newBlogIdea.save()
    .then(() => res.status(201).json({ message: 'Blog idea submitted successfully!' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/blogs', async (req, res) => {
    try {
      const blogs = await BlogIdea.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching blogs' });
    }
  });

  app.get('/api/blogs/search', async (req, res) => {
    const { author } = req.query;
    try {
        const blogs = await BlogIdea.find({ author: new RegExp(author, 'i') }); // Case-insensitive search
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Error searching blogs' });
    }
});



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
