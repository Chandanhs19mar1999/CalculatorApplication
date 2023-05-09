
let lodash = require('lodash')
const calculatorService = require('../service/calculatorService')


class calculatorController {

    constructor(request) {
        this.request = request
        this.calculatorService = new calculatorService(request)
    }

    validateOperator(operator) {
        let validOperation = ['add','sub','mul','div'];
        return validOperation.includes(operator)
    }

    initCalculator(callback) {
        let body = this.request.body;
        let num1 = body.num1;
        let num2 = body.num2;
        let operator = body.operator;


        if(!this.validateOperator(operator)) {
            return callback("invalid operator",null);
        }

        if(isNaN(num1) || isNaN(num2)) {
            return callback("invalid operand",null);
        }

        if(operator=='div') {
            if(num2 == 0) {
                return callback("divider cannot be zero",null);
            }
        }

        this.calculatorService.initCalculator(operator,num1,num2,function(err,data) {
            if(err) {
                return callback(err,null);
            } else {
                return callback(null,data);
            }
        });

    }

    operationCalculator(callback) {
        let body = this.request.body;
        let num = body.num;
        let id = body.id;
        let operator = body.operator;


        if(!this.validateOperator(operator)) {
            return callback("invalid operator",null);
        }

        this.calculatorService.operationCalculator(operator,num,id,function(err,data) {
            if(err) {
                return callback(err,null);
            } else {
                return callback(null,data);
            }
        })
    }

    undoPreviousOperation(callback) {
        let body = this.request.body;
        let id = body.id;

        this.calculatorService.undoPreviousOperation(id,function(err,data) {
            if(err) {
                return callback(err,null);
            } else {
                return callback(null,data);
            }
        })
    }

    resetCalculator(callback) {
        let id = lodash.get(this.request,'query.id',null);

        this.calculatorService.resetCalculator(id,function(err,data) {
            if(err) {
                return callback(err,null);
            } else {
                return callback(null,data);
            }
        })
    }
}


module.exports = calculatorController