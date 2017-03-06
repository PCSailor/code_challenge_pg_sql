var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;


var pg = require('pg'); // sources pg from node_modules
var config = {
  database: 'phi', // db name // TODO: add database
  host: 'localhost', // db location
  port: 5432,
  max: 10, // # connections @ once
  idleTimeoutMillis: 30000 // 30 sec timeout
}
var pool = new pg.Pool(config);

// Get static files
app.use(express.static('./server/public'));

// Get index.html
app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

/*** Build out a module to manage our treats requests. ***/
// NOTE: router GET
app.get('/treats', function(req, res){

  // var dbResult = $('#treat-display').append(req.body);

  pool.connect(function(errorConnectingToDatabase, client, done) {
    if(errorConnectingToDatabase) {
      console.log('router.get-error-connecting-to-database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM treats;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          console.log('router.get-error-making-query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {

          console.log(result.rows);
          res.send(result.rows);
          // res.send(dbResult);

        } // NOTE: FOR: else
      }) // NOTE: FOR: client.query
    } // NOTE: FOR: else
  }); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.get


// NOTE: router.post
app.post('/treats', function(req, res){
var newTreats = req.body;// NOTE: data from client.js/ajax-post/data: clientObject,
console.log('app.js/newTreats = ', newTreats);
console.log('app.js/req.body = ', req.body);
console.log(typeof req.body);
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log('router.post-error-Connecting-To-Database = ', errorConnectingToDatabase);
    res.sendStatus(500);
  } else {

    client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);',
    [newTreats.name, newTreats.description, newTreats.pic],

    function(errorMakingQuery, result) {
      done();
      if(errorMakingQuery) {
        console.log('router.post-error-Making-Query = ', errorMakingQuery);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
        // res.send(dbResult);
      } // NOTE: FOR: else
    }); // NOTE: FOR: function(errorMakingQuery
    } // NOTE: FOR: else
  }); // NOTE: FOR: pool.connect
}); // NOTE: FOR: router.post

app.listen(port, function() {
  console.log('Server running on port: ', port);
});
