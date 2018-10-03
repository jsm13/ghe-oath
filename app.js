require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth/passport.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());


app.set("trust proxy", true);
app.use(passport.initialize());


app.get('/login', (req, res) => {
  console.log(req.headers)
  console.log(req.ip)
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
