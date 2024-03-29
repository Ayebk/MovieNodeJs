
var connectionJson = require('../dbConnection.json');
var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mysql = require('mysql');

var connection = mysql.createConnection(
    connectionJson
);


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
    let password = req.body.password;

    var sql = "SELECT * FROM `users` WHERE username = ?";

    connection.query(sql, [username], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("and error occured while trying to login");
        }
        else {
            if(passwordHash.verify(password,results[0].password))
            {
                res.send(""+results[0].id);
            }
            else
            {
                res.send("incorrect username or password");
            }
        }
    })

});

module.exports = router;

