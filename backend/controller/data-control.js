import db from "../db.js";

export async function getUserData(req, res) {
    try {
        const { login } = req.params;
        const layers = (
            await db.query(
                `SELECT * FROM test.user_data WHERE login = '${login}'`
            )
        ).rows;
        res.status(200).json(layers);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function getData(req, res) {
    try {
        const layers = (
            await db.query(
                `SELECT * FROM test.user_data`
            )
        ).rows;
        res.status(200).json(layers);
    } catch (error) {
        res.status(500).send(error);
    }
}

export async function loadData(req, res) {
    const { login } = req.params;
    const layers = req.body;
    
    if (layers.length) {
        const layerValues = layers.map(({access, id, name, style, title, workspace, parameters = '', filters = '' }, index) => 
            `('${id}','${login}', '${name}', '${workspace}', '${title}', '${access}', '${parameters}', '${filters}', '${style}', ${index})`
        ).join(",");
        const query = `INSERT INTO test.user_data
            (lid, login, layer_name, workspace, title, access, parameters, filters, style, order_id)
            VALUES ${layerValues}
        `;
        try {
            await db.query(query);
            res.status(200).json({ message: "Дані завантажено" });
        } catch (error) {
            console.log(error);
            res.json({message: "Не вдалося завантажити дані"});
        }
    }
}