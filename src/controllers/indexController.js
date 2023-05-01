const {allFiles, file} = require("../services/indexServices")
const strings = require('../shared/Constants')
const getAllFiles = async (_req, res) => {
    try {
        const response = await allFiles()
        res.status(200).send(response)

    } catch (error) {
        console.error(error)
        res.status(500).send(strings.errorServer)
    }
}

const getOneFile = async (req, res) => {

    const { fileId } = req.params;

    if(!fileId) return;

    const response = await file(fileId);

    res.status(201).send(response);
}

module.exports = {
    getAllFiles,
    getOneFile
}