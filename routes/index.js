var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://@localhost/moviesapp";

/* GET home page. */

//READ
router.get('/', function(req, res, next) {
   pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM movies', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.render('index', {title: 'UNIQUE MOVIE APP', movies: result.rows});
    });

  });
});

//POST
router.post('/', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    console.log(req.body)
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    if(req.body.lookUp){
      res.redirect('/' + String(req.body.lookUp))
    }else if(req.body.deleteAll){
      client.query('DELETE FROM movies', function(err, result) {
        done();
        if (err) {
          return console.error('error fetching client from pool', err);
        }
        res.redirect('/');
      });
    }else{
      client.query('INSERT INTO movies(title, genre, year) VALUES($1, $2, $3) returning id', [req.body.title, req.body.genre, req.body.year], function(err, result) {
        done();
        if(err) {
          return console.error('error running query', err);
        }
        res.redirect('/');
        //output: 1 
      });
    }
  });
});

// SHOW
router.get('/:id', function(req, res, next){
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM movies WHERE id = $1', [req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.render('show', {movie: result.rows[0]});
    });
  });
})

//UPDATE
router.post('/:id', function(req, res, next) {
  console.log(req.body)
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
      if(req.body.submit){
        client.query('UPDATE movies SET title = $1, genre = $2, year = $3 WHERE id=$4', [req.body.title, req.body.genre, req.body.year, req.body.submit], function(err, result) {
          done();
          if(err) {
            return console.error('error running query', err);
          }
          //output: 1 
          res.send(result)
        });
      }
      if(req.body.delete){
        client.query('DELETE FROM movies WHERE id=$1 ', [req.body.delete], function(err, result) {
          done();
          if(err) {
            return console.error('error running query', err);
          }
          //output: 1 
          res.redirect('/')
        });
      }
  });
});

//DELETE ALL
router.post('/:id')


module.exports = router;
