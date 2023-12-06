const express = require(`express`)
const app = express()
app.use(express.json())
const teacherController = require(`../controller/teacher_controller`)
const auth = require("../auth/auth")
const validasiTeacher = require('../middleware/validasi')

app.post("/login", teacherController.Login)

module.exports = app