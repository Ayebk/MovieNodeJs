
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

router.post('/GetGoodReviews', function (req, res, next) {
    let id = req.body.id;

    var sql = "SELECT `A`.*, `B`.`username` FROM `reviews` as `A` INNER JOIN `users` as `B` on `A`.`userid` = `B`.`id` WHERE `A`.`movieid` = ? AND `A`.`rating` >= 3 ORDER BY RAND() LIMIT 3";

    connection.query(sql, [id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("an error occured when trying to fetch the reviews");
        }
        else {
            res.send(JSON.stringify(results));
        }
    })

});

router.post('/GetLowReviews', function (req, res, next) {
    let id = req.body.id;

    var sql = "SELECT `A`.*, `B`.`username` FROM `reviews` as `A` INNER JOIN `users` as `B` on `A`.`userid` = `B`.`id` WHERE `A`.`movieid` = ? AND `A`.`rating` < 3 ORDER BY RAND() LIMIT 3";

    connection.query(sql, [id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("an error occured when trying to fetch the reviews");
        }
        else {
            res.send(JSON.stringify(results));
        }
    })

});

module.exports = router;