const express = require(`express`)
const app = express()
app.use(express.json())
const teacherController = require(`../controller/teacher_controller`)
const auth = require("../auth/auth")

app.post("/login", teacherController.Login)
app.get("/appointment", teacherController.requestAppointment)

module.exports = app