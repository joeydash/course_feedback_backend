var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wmo_16_17',
    database : 'course_feedback_db'
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Teacher Feedback Api' });
});
router.get('/:id', function(req, res, next) {

    if (req.params.id.length===2){
        connection.query('SELECT * FROM jan_may_18 WHERE branch = "'+req.params.id+'"', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    }else{
        res.json({
            ERROR_CODE: 1011,
            ERROR : 'Not a department id '
        });
    }
});

module.exports = router;
