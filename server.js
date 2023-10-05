const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();



app
.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}))
.use(passport.session())
//console.log('test')
//console.log(app.use(bodyParser.json()));
.use((req, res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({ origin: '*'}))
.use('/',require('./routes/index.js'));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}
));

passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((user, done) =>{
  done(null, user);
});

app.get('/', (req, res)=> { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/api-docs', session: false}),
    (req, res)=> {
        req.session.user = req.user;
        res.redirect('/');
    });

//catch all errors, copied from node js site
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } 
  else {
    app.listen(port, () => {console.log(`Server listening on port ${port}`)});
  }
});

