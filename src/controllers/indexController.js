const indexServices = require("../services/indexServices")

const getAllFiles = async (req,res) => {
    const allFiles = await indexServices.allFiles()

    res.status(201).send(allFiles)
}

const getOneFile = async (req, res) => {

    const {
        params: { fileId }
    } = req;

    if(!fileId) {
        return;
    }

    const file = await indexServices.file(fileId);

    res.status(201).send(file);
}

module.exports = {
    getAllFiles,
    getOneFile
}