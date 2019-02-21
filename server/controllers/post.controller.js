const Post = require('../models/post.model')
const moment = require('moment')

module.exports.create = async (req, res) => {

  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    imageUrl: '/' + req.file.filename
  })

  try {
    await post.save()
    res.status(201).json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    text: req.body.text
  }
  try {
    const post = await Post.findOneAndUpdate({_id: req.params.id}, {$set}, {new: true})
    res.json(post)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Post.deleteOne({_id: req.params.id})
    res.json({message: 'Успешно'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const posts = await Post
      .find()
      .sort({date: -1})
    res.json(posts)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    await Post.findById(req.params.id).populate('comments')
      .exec((err, post) => {
        res.json(post)
      })
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addView = async (req, res) => {
  try {
    const $set = {
      views: req.body.views
    }
    await Post.findOneAndUpdate({_id: req.params.id}, {$set})
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAnalytics = async (req, res) => {
  try {
    const posts = await Post.find().sort({date: -1})

    const data = {
      comments: {
        labels: posts.map(post => post.title),
        data: posts.map(post => post.comments.length)
      },
      views: {
        labels: posts.map(post => post.title),
        data: posts.map(post => post.views)
      }
    }

    res.json(data)
  } catch (e) {
    res.status(500).json(e)
  }
}
