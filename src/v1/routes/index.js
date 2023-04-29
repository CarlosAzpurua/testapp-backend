const express = require('express')
const router = express.Router()
const indexController = require('../../controllers/indexController')

router.route("/").get((req, res) => {
    res.send(`hello from ${req.baseUrl}`)
})

router
    .get("/secret/files", indexController.getAllFiles)
    .get("/secret/file/:fileId", indexController.getOneFile)

module.exports = router