var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()


console.log('this is run in port' + port)
//连接本地mongo数据库
mongoose.connect('mongodb://localhost/xiew')
app.locals.moment = require('moment')
app.set('views', './views/pages')
app.set('view engine', 'jade')
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'CSS')))
app.listen(port)


//index page
app.get('/', function (req, res){
    Movie.fetch(function (err, movies) {
      if (err){
        console.log(err)
      }
      res.render('index', {
        title: 'xiew 首页',
        movies: []
      })
    })
})

//detail page
app.get('/movie/:id', function (req, res){
    var id = req.params.id
    Movie.findById (id, function (err, movie) {
          res.render('detail', {
               title: 'xiew'+ movie.title,
               movie: movie
       })
    })
    
})

//admin page
app.get('/admin/movie', function (req, res){
    res.render('admin', {
        title: 'xiew 后台录入页',
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    })
})
//admin update movie

app.get('/admin/update/:id', function (req, res){
    var id = req.params.id

    if (id) {
      Movie.findById(id, function (err, movie){
          res.render('admin', {
            title: 'Xiew 后台更新页',
            movie: movie
          })
      })

    }
})
//admin post movie
//underscore下的extend方法可以用另一个对象的新的字段替换老的对象对应的字段
app.post('/admin/movie/new', function (req, res){
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if ( id!== 'undefined') {
     Movie.findById(id, function (err, movie) {
          if (err) {
            console.log(err)
          }
          _movie = _.extend(movie, movieObj)
          _movie.save(function (err, movie){
              if (err) {
                console.log(err)
              }
              res.redirect('/movie/' + movie._id)
          })
     })  
  }
  else {
    _movie = new Movie({
       doctor: movieObj.doctor,
       title: movieObj.title, 
       language: movieObj.language,
       country: movieObj.country,
       summary: movieObj.summary,
       flash: movieObj.flash,
       poster: movieObj.poster,
       year: movieObj.year
    })
    _movie.save(function (err, movie){
      if (err) {
            console.log(err)
        }
          res.redirect('/movie/' + movie._id)
      })
  }
})


//list page
app.get('/admin/list', function (req, res){
  Movie.fetch(function (err, movies) {
    if (err){
      console.log(err)
    }
    res.render('list', {
        title: 'xiew 列表页',
        movies: movies
    })
  })
    
})

//list delete movie
app.delete('/admin/list', function(req, res) {
   var id = res.query.id

   if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err)
      }
      else {
        res.json({success: 1})
      }
    })
   }
})