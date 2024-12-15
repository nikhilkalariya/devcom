const { Post, Comment, Like } = require('../models/Post');
// const User = require('../models/User');

// Create a post
exports.createPost = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['name', 'avatar'] });

    const newPost = await Post.create({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      userId: req.user.id,
    });

    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['date', 'DESC']] });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ msg: 'Post not found' });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.userId !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.destroy();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (await Like.findOne({ where: { userId: req.user.id, postId: req.params.id } })) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    await Like.create({ userId: req.user.id, postId: req.params.id });

    const likes = await Like.findAll({ where: { postId: req.params.id } });

    res.json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const like = await Like.findOne({ where: { userId: req.user.id, postId: req.params.id } });

    if (!like) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    await like.destroy();

    const likes = await Like.findAll({ where: { postId: req.params.id } });

    res.json(likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['name', 'avatar'] });
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = await Comment.create({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      userId: req.user.id,
      postId: req.params.id,
    });

    res.json(await Comment.findAll({ where: { postId: req.params.id } }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    const comment = await Comment.findByPk(req.params.comment_id);

    if (!comment || comment.postId !== post.id) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.userId !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await comment.destroy();

    res.json(await Comment.findAll({ where: { postId: req.params.id } }));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
