require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

const passport = require('passport');
const GitHubStrategy = require('passport-github');

app.set({"trust proxy": true});
app.use(passport.initialize());

const GHE_BASE_URL = 'https://git.generalassemb.ly';
passport.use(new GitHubStrategy({
  clientID: process.env.GHE_CLIENT_ID,
  clientSecret: process.env.GHE_CLIENT_SECRET,
  callbackURL: ( process.env.NODE_ENV === 'production'
    ? 'https://obscure-falls-57635.herokuapp.com'
    : 'http://localhost:3000/auth/ghe/callback' ) + '/auth/ghe/callback',
  userProfileURL: GHE_BASE_URL + '/api/v3/user',
  authorizationURL: GHE_BASE_URL + '/login/oauth/authorize',
  tokenURL: GHE_BASE_URL + '/login/oauth/access_token'
},
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    cb(undefined, profile);
  }
));

app.get('/login', (req, res) => {
  console.log(req.ips)
  res.send('<a href="/auth/github">Sign in with GitHub</a>')
});

app.get('/auth/github', passport.authenticate('github', { session: false }));

app.get('/auth/ghe/callback',
        passport.authenticate('github', { failureRedirect: '/login',  session: false  }),
  (req, res) => {
    res.redirect('/login');
  }
);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
