import Router from "express";
import userRouter from './user-routes.js';
import dataRouter from './data-routes.js';
import geoserver from './geoserver.js';

const router = new Router();

router.use('/users', userRouter);
router.use('/layers', dataRouter);
router.use('/geoserver', geoserver);


export default router;
