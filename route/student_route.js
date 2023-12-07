const express = require(`express`)
const app = express()
app.use(express.json())
const studentController = require(`../controller/student_controller`)
const auth = require("../auth/auth")
const validasiStudent = require('../middleware/validasi')

app.post("/login", validasiStudent.validateStudent, studentController.Login)
app.get("/getstudent", auth.authVerify, studentController.getAllStudent)

module.exports = app