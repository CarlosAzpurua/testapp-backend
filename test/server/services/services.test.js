const { expect } = require('chai')
const services = require('../../../src/services/indexServices')
const _  = require('lodash')
const EntityNotFoundError = require('../../../src/error/EntityNotFoundError')
const BadRequestError = require('../../../src/error/BadRequestError')

describe('Services with mocks', async () => {

    describe('findOne',  () => {
        it('should return undefined because the entity does not exist', async () => {
            //Arrange 
            const nonExistingFileId = _.uniqueId();

            // Act 
            const file = await services.file(nonExistingFileId)
            
            //Assert 
            expect(() => file.to.throw(EntityNotFoundError))
        })

        it('should return an existing file', async () => {
            //Arrange 
            const existingFileId = 'test2.csv';

            //Assert 
            const file = await services.file(existingFileId)

            //Assert
            expect(file).to.not.be.undefined
            expect(file.file).to.be.a('array')
            expect(file.text).to.be.a('array')
            expect(file.number).to.be.a('array')
            expect(file.hex).to.be.a('array')
        })
    })

    describe('findAll', () => {
        // it('should return error because doesnt need a id', async () => {
        //     //Arrange 
        //     const existingFileId = 'test2.csv';

        //     // Act 
        //     const files = await services.allFiles(existingFileId)
            
        //     //Assert 
        //     expect(() => files.to.throw(EntityNotFoundError))
        // })

        // it('should return every file', async () => {
        //     // Arrange & Act 
        //     const files = await services.allFiles()
            
        //     console.log(files, 'this is files')

        //     //Assert 
        //     expect(() => files.to.throw(BadRequestError))
        // })
    })

    describe('formatFile', () => {
        it('should correctly format a string into an object', () => {
            //Arrange
            const testingString = "file,text,number,hex test2.csv,aTUxU\n test2.csv,HQGXmYaBqjbrLrdPDMXwSeNLXakF,26814495,776fa19e97275585c22ac0427e65232e";
            const expected = {
              file: ["test2.csv", "test2.csv"],
              text: ["aTUxU", "HQGXmYaBqjbrLrdPDMXwSeNLXakF"],
              number: [null, "26814495"],
              hex: [null, "776fa19e97275585c22ac0427e65232e"]
            };

            //Act    
            const fileToCheck = services.formatFile(testingString)          

            //Act & Assert 
            expect(fileToCheck).to.deep.equal({expected});
        });
          
        it('should handle empty input', () => {
            //Arrange
            const str = "";
            const expected = {
              file: [],
              text: [],
              number: [],
              hex: []
            };

            //Act & Assert 
            expect(services.formatFile(str)).to.equal(expected);
        });
          
        it('should handle input with only headers', () => {
            //Arrange
            const str = "file,text,number,hex File,Text,Number,Hex\n";
            const expected = {
              file: [],
              text: [],
              number: [],
              hex: []
            };

            //Act & Assert 
            expect(services.formatFile(str)).to.equal(expected);
        });
          
        it('should handle input with only one row', () => {
            //Arrange
            const str = "file,text,number,hex File1,Text1,123,0x123\n";
            const expected = {
              file: ["File1"],
              text: ["Text1"],
              number: [123],
              hex: ["0x123"]
            };
            //Act & Assert 
            expect(services.formatFile(str)).to.equal(expected);
        });
          
        it('should handle input with missing values', () => {
            //Arrange
            const str = "file,text,number,hex File1,Text1,,0x123\nFile2,,456,\n,Text3,789,";
            const expected = {
              file: ["File1", "File2", null],
              text: ["Text1", null, "Text3"],
              number: [null, 456, 789],
              hex: ["0x123", null, null]
            };

            //Act & Assert 
            expect(services.formatFile(str)).to.equal(expected);
        });
    })
})