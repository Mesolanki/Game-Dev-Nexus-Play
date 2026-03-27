const Post = require('../model/Post_model.js');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const { username, content, mediaType } = req.body;
        let mediaUrl = "";

        if (req.file) {
            mediaUrl = `http://localhost:8050/uploads/${req.file.filename}`;
        }

        const newPost = await Post.create({ username, content, mediaUrl, mediaType });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Transmission not found" });

        post.likes += 1;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { username, text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Transmission not found" });
        }

        post.comments.push({ username, text });
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getPosts, createPost, likePost, addComment };