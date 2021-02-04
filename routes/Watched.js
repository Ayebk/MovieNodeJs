
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
            res.send(JSON.stringify("error occured"));
        }
        else {
            res.send(JSON.stringify("success"));
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
            res.send(JSON.stringify("error occured"));
        }
        else {
            res.send(JSON.stringify("success"));
        }
    });
});

/* fetches watched list for given userid */
router.post('/WatchedList', function (req, res, next) {
    let userid = req.body.userid;

    var sql = "SELECT * FROM `movies` INNER JOIN ((SELECT `watched`.`id` as watchedid, `watched`.`movieid`, `watched`.`userid`, `reviews`.`id` as reviewid, `reviews`.`content`, `reviews`.`rating`, `reviews`.`movieid` as reviewMovieId FROM `watched` LEFT JOIN `reviews` ON `watched`.`userid` = `reviews`.`userid` WHERE `watched`.`userid` = ?) as `B`) ON `movies`.`id` = `B`.`movieid`";

    connection.query(sql, [userid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify("error occured"));
        }
        else {
            res.send(JSON.stringify(results));
        }
    });
});

router.post('/checkIfUserWatched', function(req, res, next){
    let userid = req.body.userid;
    let movieid = req.body.movieid;

    var sql = "SELECT * FROM `watched` WHERE `movieid` = ? AND `userid` = ?";

    connection.query(sql, [movieid, userid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send(JSON.stringify("error occured"));
        }
        else {
            if(results[0] != null)
            {
                res.send(JSON.stringify("true"));
            }
            else
            {
                res.send(JSON.stringify("false"));
            }
        }
    });
});


module.exports = router;

