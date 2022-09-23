const express = require('express');
const router = express.Router();

router.get('/home', async(req, res, next) => {
    try {
        res.send({code:0,msg:'获取成功',data:[]})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = {path:'',router}