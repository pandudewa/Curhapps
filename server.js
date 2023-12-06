const express = require(`express`)
const app = express()
const PORT = 8000
const cors = require(`cors`)
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const studentRoute = require(`./route/student_route`)
const teacherRoute = require(`./route/teacher_route`)
const conselingRoute = require('./route/conseling_route')

app.use(`/student`, studentRoute)
app.use(`/teacher`, teacherRoute)
app.use('/conseling', conselingRoute)
app.get('/', function(req, res){
    res.json({nama: 'lancar'})
})

app.listen(PORT, () => {
    console.log(`Server of curhapps runs on port ${PORT}`)
})