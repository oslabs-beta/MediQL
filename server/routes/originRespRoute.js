const express = require('express')
const router = express.Router();
const originRespController = require('../controllers/originRespController')

router.get('/', originRespController.getOriginResps, (req,res)=>{
    res.status(200).json(res.locals.originResps)
})

router.post("/remove", originRespController.removeOriginResps, (req, res) => {
  res.status(200).json('removed originRespcollection in database');
});




module.exports = router;