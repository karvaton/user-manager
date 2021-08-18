import Router from "express";
import * as control from "../controller/user-control.js";

const router = new Router();

router.get("/", control.getUsers);
router.get("/:login", control.getUser);
router.get("/:login/layers", control.getUserData);
router.post("/", control.createUser);

export default router;