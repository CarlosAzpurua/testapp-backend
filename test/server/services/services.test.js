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
            //expect(file).to.be.an('object').with.lengthOf(4)
            expect(file).to.deep.include({
                file: ["test2.csv", "test2.csv"],
                text: ["pksWX", "jbWQNGzUKcopCMADfqh"],
                number: [ null, "155" ],
                hex: [ null, "252e887c3975b1452ed71391ce57d8cf"]
            })
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

        it('should return every file', async () => {
            // Arrange & Act 
            const files = await services.allFiles()
            
            //Assert 
            expect(() => files.to.throw(BadRequestError))
        })
    })
})