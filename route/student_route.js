const express = require(`express`)
const app = express()
app.use(express.json())
const studentController = require(`../controller/student_controller`)
const auth = require("../auth/auth")

app.post("/login", studentController.Login)

module.exports = app