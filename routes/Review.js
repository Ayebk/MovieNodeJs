
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

//returns a 3 good movie reviews given a movie id
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

//returns a 3 low movie reviews given a movie id
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

/* adds or updates a review and movie rating stars */
router.post('/PostReview', function (req, res, next) {
    let id = req.body.id;
    let movieid = req.body.movieid;
    let userid = req.body.userid;
    let content = req.body.content;
    let rating = req.body.rating;

    if (movieid === 0 || userid === 0 || rating === 0) {
        res.send("invalid values " + movieid + " " + userid + " " + rating);
    }

    if (id === undefined || id === 0) {
        var sql = "INSERT INTO `reviews` (movieid, userid, content, rating) VALUES (?, ?, ?, ?);";

        connection.query(sql, [movieid, userid, content, rating], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send("an error occured when trying insert review");
            }
            else {
                CalculateAndUpdateMovieStars(movieid, rating, false, res);
            }
        })
    }
    else {
        var sql = "UPDATE `reviews` SET `content` = ?, `rating` = ? WHERE `id` = ?";
        connection.query(sql, [content, rating, id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send("an error occured when trying update review");
            }
            else {
                CalculateAndUpdateMovieStars(movieid, rating, true, res);
            }
        });
    }
});



function CalculateAndUpdateMovieStars(movieid, rating, update, res) {
    var sql = "SELECT `stars`, `count` FROM `movies` WHERE `id` = ?";
    connection.query(sql, [movieid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("an error occured when trying update movie rating");
        }
        else {
            let stars = results[0].stars;
            let count = results[0].count;

            if (update) {
                if (count === 1) {
                    stars = rating;
                }
                else {
                    stars = (stars * (count - 1) + rating) / count;
                }
            }
            else {
                count + 1;

                stars = (stars * (count - 1) + rating) / count;
            }

            UpdateMovieStars(stars, count, movieid, res);
        }
    });
}

function UpdateMovieStars(starsUpdate, countUpdate, movieid, res) {
    var sql = "UPDATE `movies` SET `stars` = ?, `count` = ? WHERE `id` = ?";
    connection.query(sql, [starsUpdate, countUpdate, movieid], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.send("an error occured when trying update review");
        }
        else {
            res.send("success");
        }
    });
}

module.exports = router;