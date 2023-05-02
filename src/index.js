require('dotenv').config()
const express = require('express')
const v1Router = require("./v1/routes")

const app = express()
const PORT = process.env.PORT || 3000

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())
app.use("/api/v1", v1Router)


app.listen(PORT, () => {
    console.log(`🛰️ Server listening on port ${PORT}`)
})