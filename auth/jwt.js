const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET
};

function verify (jwtPayload, done) {
  console.log(jwtPayload);
  done(null, jwtPayload)
}

passport.use(new Strategy(options, verify));
