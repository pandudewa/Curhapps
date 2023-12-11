const express = require(`express`)
const app = express()
app.use(express.json())
let dashboardController = require("../controller/dashboard_controller")
const auth = require("../auth/auth")

app.get("/upcoming", auth.authVerify, dashboardController.upcomingAppointment)
app.get("/last", auth.authVerify, dashboardController.lastCounseling)
app.get("/upcomingonline", auth.authVerify, dashboardController.upcomingOnline)
app.get("/lastonline", auth.authVerify, dashboardController.lastCounselingOnline)

module.exports = app