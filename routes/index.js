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
router.get('/read/:id', function(req, res, next) {
    if (req.params.id.length===2){
        connection.query('SELECT * FROM jan_may_18 WHERE branch = "'+req.params.id+'"', function (error, results, fields) {
            if (error) res.json(error);
            res.json(results);
        });
    }else {
        connection.query('SELECT * FROM jan_may_18 WHERE course_number LIKE "% '+req.params.id+'% "', function (error, results, fields) {
            if (error) res.json(error);
            res.json(results);
        });
    }
});
router.get('/read/feedback/:course_ID', function(req, res, next) {
    connection.query('SELECT * FROM course_feedback course_ID = "'+req.params.course_ID+'"', function (error, results, fields) {
        if (error) res.json(error);
        res.json(results);
    });
});
router.post('/create/', function(req, res, next) {
    connection.query("INSERT INTO course_feedback (course_ID, course_period, feedback, time, teacher_name, course_rating)" +
        "VALUES ('"+req.body.course_ID+"','jan_may_18','"+req.body.feedback+"','"+req.body.time+"','"+req.body.teacher_name+"','"+req.body.course_rating+"');",
        function (error, results, fields) {
        if (error) res.json(error);
        res.json(results);
    });
});

module.exports = router;
