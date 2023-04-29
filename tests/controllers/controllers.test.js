import { expect } from chai
import indexController from '../../src/controllers/indexController'
import _  from 'lodash'
import EntityNotFoundError from '../../src/error/EntityNotFoundError'


describe('controllers', () => {

    describe('findOne', () => {
        it('should return undefined because the entity does not exist', () => {
            //Arrange 
            const nonExistingFileId = _.uniqueId();

            // Act & Assert 
            expect(() => indexController.getOneFile(nonExistingFileId)).to.throw(
                EntityNotFoundError
            )
        })

        it('should return an existing file', () => {
            //Arrange 
            const existingFileId = 'test2.csv';

            //Assert 
            const file = indexController.getOneFile(existingFileId)

            //Assert
            expect(file).to.not.be.undefined
            expect(file).to.be.an('object').with.lengthOf(4)
            expect(file).to.deep.include({
                file: ["test2.csv", "test2.csv"],
                text: ["Txhfg", "ReYnTiacXyKAakl"],
                number: [ null, "084450746" ],
                hex: [ null, "1e786e2d77c72875c807b7e7a4a6c3b5"]
            })
        })
    })

    describe('findAll', () => {
        it('should return every file', () => {
            //Arrange 
            const existingFileId = 'test2.csv';

            // Act & Assert 
            expect(() => indexController.getAllFiles(existingFileId)).to.throw(
                EntityNotFoundError
            )
        })
    })
})