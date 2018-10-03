const passport = require('passport');
const GitHubStrategy = require('passport-github');
const { user } = require('../models').models;

const GHE_BASE_URL = 'https://git.generalassemb.ly';

const options = {
  clientID: process.env.GHE_CLIENT_ID,
  clientSecret: process.env.GHE_CLIENT_SECRET,
  callbackURL: ( process.env.NODE_ENV === 'production'
                 ? 'https://obscure-falls-57635.herokuapp.com'
                 : 'http://localhost:3000' ) + '/auth/ghe/callback',
  userProfileURL: GHE_BASE_URL + '/api/v3/user',
  authorizationURL: GHE_BASE_URL + '/login/oauth/authorize',
  tokenURL: GHE_BASE_URL + '/login/oauth/access_token'
};

function verify (accessToken, refreshToken, profile, cb) {
  user.findOrCreate({
    where: {
      username: profile.username
    },
    defaults: {
      gheId: profile.id
    }
  })
    .spread((user, created) => cb(undefined, user))
    .catch(cb);
}

passport.use(new GitHubStrategy(options, verify));
