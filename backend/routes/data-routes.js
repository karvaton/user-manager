import Router from "express";
import * as dataControl from "../controller/data-control.js";

const router = new Router();

router.get("/", dataControl.getData);
router.get("/:login", dataControl.getUserData);
router.post("/:login", dataControl.loadData);

export default router;
