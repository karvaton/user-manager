import db from "../db.js";

export async function getUsers(req, res) {
    try {
        const users = (
            await db.query("SELECT * FROM test.users WHERE id >= 0")
        ).rows;
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUser(req, res) {
    try {
        const { login } = req.params;
        const user = (
            await db.query(`SELECT * FROM test.users WHERE login = '${login}'`)
        ).rows[0];
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getUserData(req, res) {
    try {
        const { login } = req.params;
        const layers = (
            await db.query(`SELECT * FROM test.user_data WHERE login = '${login}'`)
        ).rows;
        res.status(200).json(layers);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function createUser(req, res) {
    try {
        const { id, login, name, password, email, status, print, db_conn } = req.body;
        const result = await db.query(
            `INSERT INTO test.users 
            (id, login, name, password, email, status, print, db_conn)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
            [id, login, name, password, email, status, print, db_conn]
        );
         res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}