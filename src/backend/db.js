const Pool = require("pg").Pool;
const accessConfig = require("./access_config");

const pool = new Pool(accessConfig);

const getUsers = () => {
    return new Promise(function (resolve, reject) {
        pool.query(
            "SELECT id, login, name, available_wms, selectable_wms, editable_wms, email, status, parameters, print, filters FROM admin.users WHERE id > 0",
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            }
        );
    });
};

const auth = (login, password) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT login FROM admin.users WHERE login='${login}' AND password=md5('${password}')`,
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            }
        );
    });  
}


module.exports = {
    getUsers,
    auth
};
