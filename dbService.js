const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user:'sql7390289',
    password:'Sg65X9Idd9' ,
    database: 'users',
    //port: ''
});

connection.connect((err) => {
    if (err) {
        console.log('cannot log in to DB');
    }
    
});


class DbService {
    
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM movies;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async getName(name) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM movies VALUES (id);";

                connection.query(query, [name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
            };
        } catch (error) {
            console.log(error);
        }
    }


    async deleteReviewById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM movies WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateReviewById(id, review) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE movies SET myreview = ? WHERE id = ?";
    
                connection.query(query, [review, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM movies WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;