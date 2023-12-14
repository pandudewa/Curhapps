const express = require(`express`)
const app = express()
app.use(express.json())
let onlineController = require("../controller/online_controller")
const auth = require("../auth/auth")

app.post("/addstudent", auth.authVerify, onlineController.addOnlineStudent)
app.post("/addteacher", auth.authVerify, onlineController.addOnlineTeacher)
app.get("/getonline/:id", auth.authVerify, onlineController.getAllOnline)
app.get("/getchatguru", auth.authVerify, onlineController.getChatGuru)
app.get("/getchatsiswa/:id_teacher", auth.authVerify, onlineController.getChatSiswa)
app.post("/insertchatsiswa/:id", auth.authVerify, onlineController.insertChatSiswa)
app.post("/insertchatguru/:id", auth.authVerify, onlineController.insertChatGuru)

module.exports = app