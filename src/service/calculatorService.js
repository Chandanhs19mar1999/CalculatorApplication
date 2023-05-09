class calculatorService {

    
    static idCounter = 0
    static globalMap = {}

    static generateId() {
        return calculatorService.idCounter += 1
    }

    static insertIntoGlobalMap(key,value) {
        let res = calculatorService.globalMap[key]
        if(res == null) {
            calculatorService.globalMap[key] = [value]
        } else {
            calculatorService.globalMap[key].push(value)
        }
    }

    constructor(request) {
        //
    }

    calculateResult(num1,num2,operator) {

        console.log("num2 = ",num2);

        let answer = 0

        switch(operator) {
            case 'add':
                answer = num1 + num2
                break;
            case 'sub':
                answer = num1 - num2
                break;
            case 'mul':
                answer = num1 * num2
                break;
            case 'div':
                answer = num1/num2
                break;
        }

        return answer
    }



    initCalculator(operation,num1,num2,callback) {
        let result = this.calculateResult(num1,num2,operation);
        let id = calculatorService.generateId()
        let answerObj = {
            'result':result,
            'id' : id,
            'totalOps': 1
        }
        calculatorService.insertIntoGlobalMap(id,answerObj)
        let ans = calculatorService.globalMap[id]

        console.log("globalMap = ",calculatorService.globalMap)

        return callback(null,ans);
    }


    operationCalculator(operation,num2,id,callback) {
        
        let resultArray = calculatorService.globalMap[id]

        if(typeof(resultArray) == 'undefined') {
            return callback("Id doesnot exist",null)
        }

        var answer = resultArray.slice(-1)[0]

        if(operation == 'div') {
            if(answer['result'] == 0) {
                return callback("divider cannot be zero",null);
            }
        }

        let result = this.calculateResult(answer['result'],num2,operation);
        let answerObj = {
            'result':result,
            'id' : id,
            'totalOps': answer['totalOps'] + 1
        }
        calculatorService.insertIntoGlobalMap(id,answerObj)

        console.log("globalMap = ",calculatorService.globalMap)

        return callback(null,calculatorService.globalMap[id].slice(-1))


    }

    undoPreviousOperation(id, callback) {
        let resultArray = calculatorService.globalMap[id]

        if(typeof(resultArray) == 'undefined') {
            return callback("Id doesnot exist",null)
        }

        calculatorService.globalMap[id].pop()
        console.log("globalMap after undoPreviousOperation= ",calculatorService.globalMap)

        return callback(null,calculatorService.globalMap[id].slice(-1))

    }

    resetCalculator(id,callback) {

        let resultArray = calculatorService.globalMap[id]

        if(typeof(resultArray) == 'undefined') {
            return callback("Id doesnot exist",null)
        }
        delete calculatorService.globalMap[id]

        console.log("globalMap after resetting= ",calculatorService.globalMap)

        return callback(null, {"success": true,"message": `calculator ${id} is now reset`})
        
    }
}

module.exports = calculatorService