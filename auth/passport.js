const passport = require('passport');
const GitHubStrategy = require('passport-github');

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
  console.log(profile);
  cb(undefined, profile);
}

passport.use(new GitHubStrategy(options, verify));
