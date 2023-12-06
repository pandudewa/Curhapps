const express = require(`express`)
const app = express()
app.use(express.json())
const teacherController = require(`../controller/teacher_controller`)
const auth = require("../auth/auth")
const validasiTeacher = require('../middleware/validasi')

app.post("/login", validasiTeacher.validateTeacher, teacherController.Login)
app.get("/getteacher", auth.authVerify, teacherController.getAllTeacher)
app.get("/appointment", auth.authVerify, teacherController.requestAppointment)
app.put("/approve/:id", auth.authVerify, teacherController.approveAppointment)
app.put("/reject/:id", auth.authVerify, teacherController.rejectAppointment)

module.exports = app