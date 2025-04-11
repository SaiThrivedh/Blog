const { Blog, User } = require('../models');

exports.createBlog = async (req, res) => {
  try {
    console.log("Request body:", req.body); // 🔍 Add this line

    const { title, content, imageUrl, userId, category, author } = req.body;

    const blog = await Blog.create({
      title,
      content,
      imageUrl,
      userId,
      category,
      author
    });

    res.status(201).json(blog);
  } catch (err) {
    console.error("Blog creation error:", err); // 🔍 Add this too
    res.status(500).json({ error: 'Error creating blog', details: err.message });
  }
};



exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'email'] // use correct columns from Users table
      }]
    });
    
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blogs', details: err.message });
  }
};




exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const foundBlog = await Blog.findByPk(blogId, {
      include: [{
        model: User,
        as: 'user', // This must match the alias used in associations
        attributes: ['id', 'username', 'email']
      }]
    });

    if (!foundBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json(foundBlog);

  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog', details: err.message });
  }
};




exports.updateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    await blog.update({ title, content, imageUrl });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error updating blog', details: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting blog', details: err.message });
  }
};
