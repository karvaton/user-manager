import pg from "pg";
import db from "../db.js";
import { TABLE } from "./user-control.js";

let connection = {
    schema: "public",
    database: "bazis",
    host: "45.94.158.117",
    port: "5432",
    user: "postgres",
};

async function getUser(login) {
    try {
        const conn_str = (
            await db.query(`SELECT db_conn FROM ${TABLE} WHERE login = '${login}'`)
        ).rows[0].db_conn;
        return JSON.parse(conn_str);
    } catch (error) {
        return null;
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
            
        const pool = new pg.Pool(connection);
        const parameters = (await pool.query(
            `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}'`
        )).rows.map(({ column_name }) => column_name);
        res.status(200).json(parameters);
    } catch (error) {
        console.log(error);
    }
}