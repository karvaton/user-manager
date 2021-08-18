import Router from "express";
import userRouter from './user-routes.js';

const router = new Router();

router.use('/users', userRouter);

export default router;
