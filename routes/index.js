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
        connection.query('SELECT * FROM jan_may_18 WHERE course_number LIKE "%'+req.params.id+'%"', function (error, results, fields) {
            if (error) res.json(error);
            res.json(results);
        });
    }
});
router.get('/read/feedback/:course_ID', function(req, res, next) {
    connection.query('SELECT * FROM course_feedback WHERE course_ID LIKE "%'+req.params.course_ID+'%"', function (error, results, fields) {
        if (error) res.json(error);
        res.json(results);
    });
});
router.post('/create/', function(req, res, next) {
    connection.query("INSERT INTO course_feedback (prof_name, attendance, course, grading, prof_rating, gen_feedback)" +
        "VALUES ('"+req.body.prof_name+"','"+req.body.attendance+"','"+req.body.course+"','"+req.body.grading+"','"+req.body.prof_rating+"','"+req.body.gen_feedback+"');",
        function (error, results, fields) {
        if (error) res.json(error);
        res.json(results);
    });
});
router.get('/read_all_feedback', function(req, res, next) {
    connection.query('SELECT * FROM course_feedback', function (error, results, fields) {
        if (error) res.json(error);
        res.json(results);
    });
});

module.exports = router;
