const session = require('express-session');
const RedisStore = require('connect-redis')(session);
var url = require('url');
const redisClient = require('redis').createClient(process.env.REDIS_URL || '');

if (process.env.REDIS_URL) {
  var redisURL = url.parse(process.env.REDIS_URL).hostname;
}

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.logged = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).send({message: false});
};

module.exports.profile = (req, res, next) => {
  if (req.user === undefined) {
    res.redirect('/');
  } else if (req.user.type === null) {
    res.redirect('/signup/create');
  } else {
    return next();
  }
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: redisURL || 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});

