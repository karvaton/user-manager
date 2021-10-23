import pg from "pg";
import db from "../db.js";
import { TABLE } from "./user-control.js";

const connection = {
    schema: "public",
    database: "bazis",
    host: "45.94.158.117",
    port: "5432",
    user: "postgres",
};
const ip = process.env.PGHOST;

async function getUser(login) {
    // const client = await db.connect();
    try {
        const conn_str = (
            await db.query(`SELECT db_conn FROM ${TABLE} WHERE login = '${login}'`)
        ).rows[0].db_conn;
        return JSON.parse(conn_str);
    } catch (error) {
        return null;
    } finally {
        // client.release();
    }
}

export async function getParamNames(req, res) {
    const pool = new pg.Pool(connection);
    const parameters = (await pool.query(
        `SELECT parameterid, name FROM ${connection.schema}._parameters`
    )).rows;
    res.status(200).json(parameters);
}

export async function getParameters(req, res) {
    try {
        const { login } = req.params;
        const { table } = req.query;

        const connection =
            req.method === "POST" ? req.body : await getUser(login);

        if (connection.host === "localhost") {
            connection.host = ip;
        }
        var pool = new pg.Pool(connection);
        // var client = await pool.connect();
        const parameters = (
            await pool.query(
                `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`
            )
        ).rows.map(({ column_name }) => column_name);
        res.status(200).json(parameters);
    } catch (error) {
        console.log(error);
    } finally {
        // client &&
        // client.release();
        pool.end();
    }
}