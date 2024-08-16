// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('index', { posts });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show single post
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('show', { post });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create post form
router.get('/create', (req, res) => {
    res.render('create');
});

// Create post
router.post('/post', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Edit post form
router.get('/edit/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.render('edit', { post });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update post
router.post('/edit/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        await Post.findByIdAndUpdate(req.params.id, { title, content });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete post
router.post('/delete/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
