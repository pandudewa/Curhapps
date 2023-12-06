const express = require(`express`)
const app = express()
app.use(express.json())
const studentController = require(`../controller/student_controller`)
const auth = require("../auth/auth")
const validasiTeacher = require('../middleware/validasi')

app.post("/login", validasiTeacher.validateStudent, studentController.Login)

module.exports = app