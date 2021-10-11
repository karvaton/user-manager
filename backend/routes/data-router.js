import Router from "express";
import pg from 'pg';


const router = new Router();

let connection = {
    schema: "public",
    database: "bazis",
    host: "45.94.158.117",
    port: "5432",
    user: "postgres",
};

router.get('/parameters', async function (req, res) {
    const pool = new pg.Pool(connection);
    const parameters = (await pool.query(
        `SELECT parameterid, name FROM ${connection.schema}._parameters`
    )).rows;
    res.status(200).json(parameters);
});


export default router;