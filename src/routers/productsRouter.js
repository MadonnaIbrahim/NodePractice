const express = require('express');
const debug = require('debug')('app');
const { MongoClient, ObjectId } = require('mongodb')
const passport=require('passport');

const products = require('../data/products.json');

const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
  const url =
    'mongodb+srv://dbUser:Sa1234@cluster0.kwdpr4g.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'NodeMarket';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

productsRouter.route('/:id').get((req, res) => {
  debug('getting single item');
  const id = req.params.id;
  const url=
  'mongodb+srv://dbUser:Sa1234@cluster0.kwdpr4g.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'NodeProducts';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      var o_id =  ObjectId(id);
      const product = await db.collection('products').findOne({_id:o_id});

      res.render('product', {
        product,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
