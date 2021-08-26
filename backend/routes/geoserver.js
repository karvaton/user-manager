import Router from "express";
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
// import * as control from "../controller/user-control.js";
const {GEOSERVLOG, GEOSERVPASS} = process.env;

const router = new Router();

router.get(/\//, (req, res) => {
    fetch(
        `http://${GEOSERVLOG}:${GEOSERVPASS}@45.94.158.117:8080/geoserver/rest/${req.path}.json`
    )
        .then(result => result.json())
        .then(json => res.status(200).send(json))
        .catch(err => res.status(500).send(err));
});


export default router;
