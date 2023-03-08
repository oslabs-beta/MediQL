const express = require('express')
const router = express.Router();
const queryRespController = require('../controllers/queryRespController')

router.get('/', queryRespController.getLatestQueryResp, (req,res)=>{
    res.status(200).json(res.locals.latestQuery)
})




module.exports = router;