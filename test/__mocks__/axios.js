const jest = require('jest')

module.exports = { 
    get: jest.fn(url => {
        switch(url) {
            case 'https://echo-serv.tbxnet.com/v1/secret/file/test2.csv':
                return Promise.resolve('file,text,number,hex\n test2.csv,pksWX\n test2.csv,jbWQNGzUKcopCMADfqh,155,252e887c3975b1452ed71391ce57d8cf');
            case 'https://echo-serv.tbxnet.com/v1/secret/files':
                return Promise.resolve({"files":["test1.csv","test2.csv","test3.csv","test18.csv","test4.csv","test5.csv","test6.csv","test9.csv","test15.csv"]});
        }
    }) 
}