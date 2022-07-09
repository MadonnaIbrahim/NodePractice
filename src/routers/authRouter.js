const express = require('express');
const debug = require('debug')('app');
const { MongoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();

authRouter.route('/register').post((req, res) => {
    debug(req.body);
  const { username, password,email } = req.body;
  const url =
  'mongodb+srv://dbUser:Sa1234@cluster0.kwdpr4g.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'NodeMarket';

  let i=0;
  (async function addUser() {
debug('adding new user');
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbName);
      i=++i;
      const user = { i,email,username, password };
      const results = await db.collection('users').insertOne(user);
      debug(results);
        res.redirect('/profile');
    } catch (error) {
      debug(error);
    }
    client.close();
  })();
});

authRouter
  .route('/login')
  .get((req, res) => {
    res.render('login');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    })
  );
authRouter.route('/profile').get((req, res) => {
res.json('user added successfully');
});

module.exports = authRouter;
