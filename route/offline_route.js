const express = require(`express`)
const app = express()
app.use(express.json())
let offlineController = require("../controller/offline_controller")
const auth = require("../auth/auth")

app.get("/appointment", auth.authVerify, offlineController.dataOffline)

module.exports = app