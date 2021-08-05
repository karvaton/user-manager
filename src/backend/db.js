const pg = require("pg");
const accessConfig = require("./access_config");

const client = new pg.Pool(accessConfig);
const query = {
    getUsers: "SELECT * FROM admin.users",
};
Object.freeze(query);

module.export = { query, client };
