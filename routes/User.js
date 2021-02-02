
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


/* register a user */
router.post('/register', function (req, res, next) {
    console.log(req);

    let username = req.body.username;
    let password = passwordHash.generate(req.body.password);

    var sql = "INSERT INTO `users` (username, password) VALUES (?, ?);";

    connection.query(sql, [username, password], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send("added user");
        }
    });
});

router.post('/login', function (req, res, next) {
    let username = req.body.username;
    let password = passwordHash.generate(req.body.password);

    var sql = "SELECT * FROM `users` WHERE username = ?";

    connection.query(sql, [username], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("and error occured while trying to login");
        }
        else {
            console.log(results);
            console.log(password);
            if(results.password === password)
            {
                return ""+results.id;
            }
        }
    })

});

/* GET home page. */
router.get('/time', function (req, res, next) {
    let time = Date();
    res.send(`${time}`);
});

module.exports = router;

