const express = require(`express`)
const app = express()
app.use(express.json())
let dashboardController = require("../controller/dashboard_controller")
const auth = require("../auth/auth")

app.get("/upcoming/:id", auth.authVerify, dashboardController.upcomingAppointment)
app.get("/last/:id", auth.authVerify, dashboardController.lastCounseling)
app.get("/upcomingonline/:id", auth.authVerify, dashboardController.upcomingOnline)
app.get("/lastonline/:id", auth.authVerify, dashboardController.lastCounselingOnline)

module.exports = app