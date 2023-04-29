const jest = require('jest')

const axios = {
    get: jest.fn((data) => Promise.resolve('file,text,number,hex\n test2.csv,pksWX\n test2.csv,jbWQNGzUKcopCMADfqh,155,252e887c3975b1452ed71391ce57d8cf')),
    get: jest.fn(() => Promise.resolve({"files":["test1.csv","test2.csv","test3.csv","test18.csv","test4.csv","test5.csv","test6.csv","test9.csv","test15.csv"]}))
}

module.exports = { axios }