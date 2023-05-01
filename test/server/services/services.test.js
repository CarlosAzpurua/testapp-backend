const { expect } = require('chai')
const services = require('../../../src/services/indexServices')
const _  = require('lodash')
const strings = require('../../../src/shared/Constants')

describe('Services with mocks', async () => {

    describe('findOne',  () => {
        it('should return undefined because the entity does not exist', async () => {
            //Arrange 
            const nonExistingFileId = _.uniqueId();

            // Act 
            const file = await services.file(nonExistingFileId)
            
            const expected = {message: strings.error, status: 404}

            //Assert 
            expect(() => file.to.be.equal(expected))
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

    describe('formatFile', () => {
        it('should return an object formatted with valid input', () => {
            //Arrange
            const input = "file,text,number,hex\n test2.csv,aTUxU\n test2.csv,HQGXmYaBqjbrLrdPDMXwSeNLXakF,26814495,776fa19e97275585c22ac0427e65232e";
            const expected = {
              file: ["test2.csv", "test2.csv"],
              text: ["aTUxU", "HQGXmYaBqjbrLrdPDMXwSeNLXakF"],
              number: [null, "26814495"],
              hex: [null, "776fa19e97275585c22ac0427e65232e"]
            };

            //Act    
            const fileToCheck = services.formatFile(input)          

            //Assert 
            expect(fileToCheck).to.deep.equal(expected);
        });
          
        it('should handle empty input', () => {
            //Arrange
            const blankString = "";
            const emptyExpected = {
                file: [],
                hex: [],
                number: [],
                text: []
            };

            //Act    
            const fileToCheck = services.formatFile(blankString)          

            //Assert 
            expect(fileToCheck).to.deep.equal(emptyExpected);
        });
          
        it('should handle input with only headers', () => {
            //Arrange
            const str = "file,text,number,hex\n File.csv,Text,1235,Hex";
            const expected = {
              file: ["File.csv"],
              hex: ["Hex"],
              number: ["1235"],
              text: ["Text"]
            };

            //Act & Assert 
            expect(services.formatFile(str)).to.deep.equal(expected);
        });

        it("test_format_file_with_empty_input", () => {
            const input = "";
            const expectedOutput = {
                file: [],
                text: [],
                number: [],
                hex: []
            };
            expect(formatFile(input)).to.equal(expectedOutput);
        });
          
        it('should handle input with missing values', () => {
            //Arrange
            const str = "file,text,number,hex\n File1,Text1,,0x123\nFile2,,456,\n,Text3,789,";
            const expected = {
              file: ["File1", "File2", null],
              text: ["Text1", null, "Text3"],
              number: [null, "456", "789"],
              hex: ["0x123", null, null]
            };

            //Act & Assert 
            expect(services.formatFile(str)).to.deep.equal(expected);
        });
    })
})