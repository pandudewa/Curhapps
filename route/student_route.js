const express = require(`express`)
const app = express()
app.use(express.json())
const studentController = require(`../controller/student_controller`)
const conselingResultController = require('../controller/conseling_result_controller')
const auth = require("../auth/auth")
const validasiStudent = require('../middleware/validasi')

app.post("/login", validasiStudent.validateStudent, studentController.Login)
app.get("/getstudent", auth.authVerify, studentController.getAllStudent)
app.post("/conseling_rating/:id", auth.authVerify, conselingResultController.addRating)
// app.get("/get_rating/:id_teacher", auth.authVerify, conselingResultController.getRating)

module.exports = app