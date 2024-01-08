const express = require('express');
const router = express.Router();
const postController = require('../controller/blog');

router.get('/getAll', postController.getAllPosts);
router.post('/create', postController.createPost);

module.exports = router;