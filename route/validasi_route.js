const express = require(`express`)
const app = express()
app.use(express.json())
let validasiMiddleware = require("../middleware/validasi")
const auth = require("../auth/auth")

app.post("/ValidateStudent",  validasiMiddleware.validateStudent)
app.post("/ValidateTeacher", validasiMiddleware.validateTeacher)

module.exports = app