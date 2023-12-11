const express = require(`express`)
const app = express()
app.use(express.json())
let counselingResultController = require("../controller/conseling_result_controller")
const auth = require("../auth/auth")

app.post("/insertresult", auth.authVerify, counselingResultController.addConselingResultTeacher)

module.exports = app