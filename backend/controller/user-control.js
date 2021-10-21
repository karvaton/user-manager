import db from "../db.js";
import { loadData, TABLE as DATA_TABLE } from "./layers-control.js";
export const TABLE = 'test.users';

const ip = process.env.PGHOST;

export async function getUsers(req, res) {
    const client = await db.connect();
    try {
        const users = (
            await client.query(`SELECT * FROM ${TABLE} WHERE id >= 0`)
        ).rows;
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(null);
    } finally {
        client.release();
    }
}

export async function getUser(req, res) {
    const client = await db.connect();
    try {
        const { login } = req.params;
        const user = (
            await client.query(`SELECT * FROM ${TABLE} WHERE login = '${login}'`)
        ).rows[0];
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(null);
    } finally {
        client.release();
    }
}


export async function createUser(req, res) {
    const client = await db.connect();
    try {
        const { login, name, password, email, layers, status, print, entry } = req.body;
        if (entry.host === "localhost") {
            entry.host = ip;
        }
        await client.query(
            `INSERT INTO ${TABLE} 
            (login, name, password, email, status, print, db_conn)
            VALUES ($1, $2, md5($3), $4, $5, $6, $7)`,
            [login, name, password, email, status, print, JSON.stringify(entry)]
        );
        await loadData(login, layers);
        res.status(200).json({ message: "Користувача створено" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося створити користувача" });
    } finally {
        client.release();
    }
}

export async function update(req, res) {
    const client = await db.connect();
    try {
        const { login } = req.params;
        const { fields } = req.body;
        const updates = fields.map((field) => {
            let [key, value] = Object.entries(field)[0];
            return `${key} = ${value}`;
        });
        const user = (
            await client.query(`
                UPDATE ${TABLE}
                SET ${updates.join(",")}
                WHERE login = '${login}' RETURNING  *
            `)
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не оновити дані" });
    } finally {
        client.release();
    }
}

export async function deleteUser(req, res) {
    const client = await db.connect();
    try {
        const { login } = req.params;

        await client.query(`DELETE FROM ${DATA_TABLE} WHERE login = '${login}'`)
        const user = (
            await client.query(
                `DELETE FROM ${TABLE} WHERE login = '${login}' RETURNING *`
            )
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося видалити корисутвача" });
    } finally {
        client.release();
    }
}