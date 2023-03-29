import { Request, Response } from "express";

const express = require('express')
const router = express.Router();
const queryRespController = require('../controllers/queryRespController')

router.get('/', queryRespController.getLatestQueryResp, (req: Request,res:Response)=>{
    res.status(200).json(res.locals.latestQuery)
})




export default router