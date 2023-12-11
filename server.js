const express = require(`express`)
const app = express()
const PORT = 3001
const cors = require(`cors`)
const path = require('path')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const studentRoute = require(`./route/student_route`)
const teacherRoute = require(`./route/teacher_route`)
const conselingRoute = require('./route/conseling_route')
const offlineRoute = require('./route/offline_route')
const onlineRoute = require('./route/online_route')
const counselingResultRoute = require('./route/counseling_result_route')
const dashboardRoute = require('./route/dasboard_route')

app.use(`/student`, studentRoute)
app.use(`/teacher`, teacherRoute)
app.use('/conseling', conselingRoute)
app.use('/offline', offlineRoute)
app.use('/online', onlineRoute)
app.use('/result', counselingResultRoute)
app.use('/dashboard', dashboardRoute)
app.get('/', function(req, res){
    res.json({nama: 'lancarsss'})
})
app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server of curhapps runs on port ${PORT}`)
})