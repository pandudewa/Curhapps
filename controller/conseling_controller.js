const offlineModel = require(`../models/index`).offline
const conselingModel = require(`../models/index`).conseling
const teacherModel = require(`../models/index`).teacher
const Op = require(`sequelize`).Op
const { getUserLogin } = require('../auth/auth')
const Sequelize = require("sequelize");
const sequelize = new Sequelize("curhapps", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

exports.addConseling = async (request, response) => {
    user = getUserLogin(request)

    let newConseling = {
        id_student: user.id_user,
        id_teacher: request.body.id_teacher,
        category: 'offline',
        isclosed: false,
    }

    const conseling = await conselingModel.findAll({
        where: [
            {id_teacher: request.body.id_teacher },
            {id_student: user.id_user },
            {isclosed: false },
        ]
    })
    return response.json({
        status: conseling,});
    if(conseling.length > 0){
        return response.json({
            status: false,
            message: 'anda belum bisa konseling dengan guru bk ini karena masih ada konseling yang belum terselesaikan',
        })
    }

    // await teacherModel.update({ status: false }, { where: { id_teacher: request.body.id_teacher } })

    conselingModel.create(newConseling)
        .then(async (result) => {

            let id = result.id_conseling

            // var createdDate = new Date(request.body.meeting_date);
            // var date = createdDate.toLocaleDateString();

            // var day = createdDate.getDate();
            // var month = createdDate.getMonth() + 1; //months are zero based
            // var year = createdDate.getFullYear();

            // var time = createdDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');

            // let tanggal = (year + '-' + month.pad() + '-' + day.pad() + ' ' + time);

            var d = new Date(request.body.meeting_date);
            d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

            let offLine = {
                id_conseling: id,
                aproval: null,
                meeting_date: d,
            };

            offlineModel.create(offLine)
                .then(async (result) => {
                    return response.json({ status: true ,data: result })
                })

            // for (let i = 0; i < offline.length; i++) {
            //     offline[i].id_conseling = id
            // }

            // await offlineModel.bulkcreate(offline)
            //  .then(result => {
            //     return response.json({
            //         message: 'success',
            //         status: true
            //     })
            //  })
            //  .catch(error => {
            //     return response.json({
            //         message: error.message
            //     })
            //  })
        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}