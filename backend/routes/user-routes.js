import Router from "express";
import * as userControl from "../controller/user-control.js";
import * as dataControl from "../controller/data-control.js";

const router = new Router();

router.get("/", userControl.getUsers);
router.get("/:login", userControl.getUser);
router.get("/:login/layers", dataControl.getUserData);
router.post("/", userControl.createUser);
router.put("/", userControl.updatePassword);

export default router;