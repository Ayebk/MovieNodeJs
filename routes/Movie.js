
var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7390289',
    password: 'Sg65X9Idd9',
    database: 'sql7390289'
});


router.post('/Like',function(req, res, next){
    let input = '%' + req.body.input +'%';
    var sql = "SELECT * FROM `movies` WHERE title LIKE ?";
    connection.query(sql, [input], function(error, results, fields){
        if(error){
            console.log(error);
            res.send(JSON.stringify("error occured"));
        }else{
            res.send(JSON.stringify(results));
        }
    })
})

router.get('/All', function (req, res, next) {
    var sql = "SELECT * FROM `movies`";
    connection.query(sql, [], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});

router.get('/AllAction', function (req, res, next) {
    var sql = "SELECT * FROM `movies` WHERE genre LIKE '%Action%'";
    connection.query(sql, [], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});

router.get('/AllComedy', function (req, res, next) {
    var sql = "SELECT * FROM `movies` WHERE genre LIKE '%Comedy%'";
    connection.query(sql, [], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});

router.post('/Suggest', function (req, res, next) {
    let id = req.body.id;

    var sql = "SELECT `A`.* FROM `movies` as `A` LEFT JOIN (SELECT * FROM `watched` WHERE `userid` = ?) as `B` ON `A`.`id` = `B`.`movieid` WHERE `B`.`movieid` IS NULL ORDER BY RAND() LIMIT 1";

    connection.query(sql, [id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("and error occured while trying to login");
        }
        else {
            res.send(JSON.stringify(results));
        }
    })

});

module.exports = router;