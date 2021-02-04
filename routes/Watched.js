
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7390289',
    password: 'Sg65X9Idd9',
    database: 'sql7390289'
});


/* add to watched list */
router.post('/addToWatchedList', function (req, res, next) {
    let userid = req.body.userid;
    let movieid = req.body.movieid;

    var sql = "INSERT INTO `watched` (userid, movieid) VALUES (?, ?);";

    connection.query(sql, [userid, movieid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send("success");
        }
    });
});

/* remove from watched list */
router.post('/removeFromWatchedList', function (req, res, next) {
    let userid = req.body.userid;
    let movieid = req.body.movieid;

    var sql = "DELETE FROM `watched` WHERE `userid`= ? AND `movieid` = ?";

    connection.query(sql, [userid, movieid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send("success");
        }
    });
});

/* fetches watched list for given userid */
router.post('/WatchedList', function (req, res, next) {
    let userid = req.body.userid;

    var sql = "SELECT `watched`.`id` as watchedid, `watched`.`movieid`, `watched`.`userid`, `reviews`.`id` as reviewid, `reviews`.`content`, `reviews`.`rating` FROM `watched` LEFT JOIN `reviews` ON `watched`.`userid` = `reviews`.`userid` WHERE `watched`.`userid` = ?";

    connection.query(sql, [userid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("error occured");
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});


module.exports = router;

