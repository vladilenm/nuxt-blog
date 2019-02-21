const {Strategy, ExtractJwt} = require('passport-jwt')
const keys = require('../keys')
const User = require('../models/user.model')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

module.exports = passport => {
  passport.use(new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('id')
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (e) {
      console.error(e)
    }
  }))
}
