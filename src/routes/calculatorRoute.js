const express = require('express')
let router = express.Router()
const calculatorController = require('../controller/calculatorController')

router.post('/init',function(req,res,next){
    return new calculatorController(req).initCalculator(function(err,data) {
        if(err) {
            return next(err);
        } else {
            return res.send(data);
        }
    })
});

router.post('/operation',function(req,res,next){
    return new calculatorController(req).operationCalculator(function(err,data) {
        if(err) {
            return next(err);
        } else {
            return res.send(data);
        }
    })
});

router.put('/undo',function(req,res,next){
    return new calculatorController(req).undoPreviousOperation(function(err,data) {
        if(err) {
            return next(err);
        } else {
            return res.send(data);
        }
    })
});

router.get('/reset',function(req,res,next){
    return new calculatorController(req).resetCalculator(function(err,data) {
        if(err) {
            return next(err);
        } else {
            return res.send(data);
        }
    })
});

module.exports = router