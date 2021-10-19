import db from "../db.js";
import { TABLE as DATA_TABLE } from './layers-control.js';
export const TABLE = 'test.users';

const ip = process.env.PGHOST;

export async function getUsers(req, res) {
    try {
        const users = (
            await db.query(`SELECT * FROM ${TABLE} WHERE id >= 0`)
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
            await db.query(`SELECT * FROM ${TABLE} WHERE login = '${login}'`)
        ).rows[0];
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}


export async function createUser(req, res) {
    try {
        const { login, name, password, email, status, print, entry } = req.body;
        if (entry.host === 'localhost') {
            entry.host = ip;
        }
        await db.query(
            `INSERT INTO ${TABLE} 
            (login, name, password, email, status, print, db_conn)
            VALUES ($1, $2, md5($3), $4, $5, $6, $7)`,
            [login, name, password, email, status, print, JSON.stringify(entry)]
        );
        res.status(200).json({ message: "Користувача створено" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося створити користувача" });
    }
}

export async function update(req, res) {
    try {
        const { login } = req.params;
        const { fields } = req.body;
        const updates = fields.map(field => {
            let [key, value] = Object.entries(field)[0]
            return `${key} = ${value}`;
        });
        const user = (
            await db.query(`
                UPDATE ${TABLE}
                SET ${updates.join(',')}
                WHERE login = '${login}' RETURNING  *
            `)
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не оновити дані"})
    }
}

export async function deleteUser(req, res) {
    try {
        const { login } = req.params;

        await db.query(`DELETE FROM ${DATA_TABLE} WHERE login = '${login}'`)
        const user = (
            await db.query(
                `DELETE FROM ${TABLE} WHERE login = '${login}' RETURNING *`
            )
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося видалити корисутвача" });
    }
}