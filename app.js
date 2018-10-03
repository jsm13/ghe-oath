require('dotenv').config();
const qs = require('querystring');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./auth/passport');
require('./auth/jwt');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());


app.set("trust proxy", true);
app.use(passport.initialize());


app.get('/login', (req, res) => {
  res.send('<a href="/auth/github">Sign in with GitHub</a>')
});

app.get('/auth/github', passport.authenticate('github', { session: false }));

app.get('/auth/ghe/callback',
  passport.authenticate('github', { failureRedirect: '/login',  session: false  }),
  (req, res) => {
    console.log(req.user.username);
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      username: req.user.username
    }, process.env.TOKEN_SECRET);
    res.redirect('/login?' + qs.stringify({ token }));
  }
);

app.post('/attendance', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`<h1>Hello ${req.user.username}!</h1>`)
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})
