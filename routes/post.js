const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');


router.post('/', [auth, [check('text', 'Text is required').not().isEmpty()]], postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getPostById);
router.delete('/:id', auth, postController.deletePost);
router.put('/like/:id', auth, postController.likePost);
router.put('/unlike/:id', auth, postController.unlikePost);
router.post('/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]], postController.commentOnPost);
router.delete('/comment/:id/:comment_id', auth, postController.deleteComment);

module.exports = router;
