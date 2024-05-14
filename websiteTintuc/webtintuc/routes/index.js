var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');

var url = `mongodb+srv://thanhphong:12345@cluster0.l8w96.mongodb.net/Tintuc?retryWrites=true&w=majority`;;
var MongoClient = mongodb.MongoClient;
var data = [];


/* Thiết lập kết nối mongodb */
MongoClient.connect(url, {
    useUnifiedTopology: true
}, function(err, db) {
    var dbo = db.db('Tintuc');
    dbo.collection('tintuc').find({}).toArray(function(err, result) {
        if (err) {
            throw err;
        } else {
            data = result;
        }
    });
});

/* GET home page. */

console.log('Running on : http://localhost:1001/ ')
router.get('/', function(req, res, next) {
    res.render('content/index', {
        title: 'Web tin tuc',
        data: data
    });
});

router.get('/show_content/:id', function(req, res, next) {
    var tintucid = req.params.id;
    var data_content = data.find(o => o.ma_tintuc == tintucid);
    console.log(data_content.ma_tintuc)
    res.render('content/show-content', {
        title: data_content.tieude,
        datacontent: data_content,
        data_goiy: data
    });
});


module.exports = router;