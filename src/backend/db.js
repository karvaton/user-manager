const Pool = require("pg").Pool;
const accessConfig = require("./access_config");

const pool = new Pool(accessConfig);

const getUsers = () => {
    return new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM admin.users WHERE id > 0", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
};



module.exports = {
    getUsers
};
