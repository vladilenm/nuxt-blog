const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

    if (isPasswordCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60})
      res.json({token})
    } else {
      res.status(401).json({message: 'Пароль неверный'})
    }
  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
}

module.exports.create = async (req, res) => {
  const candidate = await User.findOne({login: req.body.login})

  if (candidate) {
    res.status(409).json({message: 'Такой login уже занят'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      error(res, e)
    }
  }
}
