const express = require(`express`)
const app = express()
app.use(express.json())
let conselingController = require("../controller/conseling_controller")
const auth = require("../auth/auth")

app.post("/",  conselingController.addConseling)

module.exports = app