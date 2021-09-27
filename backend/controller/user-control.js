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


export async function createUser(req, res) {
    try {
        const { login, name, password, email, status, print, entry } = req.body;
        await db.query(
            `INSERT INTO test.users 
            (login, name, password, email, status, print, db_conn)
            VALUES ($1, $2, md5($3), $4, $5, $6, $7)`,
            [login, name, password, email, status, print, JSON.stringify(entry)]
        );
        res.status(200).json({message: "Користувача створено"});
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося створити користувача" });
    }
}

export async function updatePassword(req, res) {
    try {
        const { login, password } = req.body;

        const banks = (
            await db.query(
                `UPDATE test.users
                SET password = md5('${password}')
                WHERE login = '${login}' RETURNING  *`
            )
        ).rows[0];
        res.status(200).send(banks);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося змінити пароль"})
    }
}