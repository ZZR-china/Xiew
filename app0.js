//无数据库时写法
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'bower_components')))
app.use(express.static(path.join(__dirname,'CSS')))
app.listen(port)


//index page
app.get('/', function (req, res){
    res.render('index', {
        title: 'xiew 首页',
        movies: [{
          title: '机械战警',
          _id: 1,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
          title: '机械战警',
          _id: 2,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
          title: '机械战警',
          _id: 3,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
          title: '机械战警',
          _id: 4,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
          title: '机械战警',
          _id: 5,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
          title: '机械战警',
          _id: 6,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }]
    })
})

//detail page
app.get('/movie/:id', function (req, res){
    res.render('detail', {
        title: 'xiew 详情页',
        movie: {
            title: '机械战警',
            doctor: '何塞',
            country: '美国',
            year: 2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '这是一部科幻电影，探讨未来司法的可能性'
        }
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

//list page
app.get('/admin/list', function (req, res){
    res.render('list', {
        title: 'xiew 列表页',
        movies: [{
            title: '机械战警',
            _id: 1,
            doctor: '何塞',
            country: '美国',
            year: 2014,
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
        }]
    })
})

