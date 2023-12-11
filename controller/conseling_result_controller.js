const { response } = require('../route/conseling_route')
const conselingModel = require(`../models/index`).conseling
const counselingResultModel = require('../models/index').counseling_result
const onlineModel = require(`../models/index`).online
const studentModel = require(`../models/index`).student
const teacherModel = require(`../models/index`).teacher
const Op = require(`sequelize`).Op
const sequelize = require('../config/connect_db').sequelize
const {getUserLogin} = require('../auth/auth')

exports.addConselingResultTeacher = async (request, response) => {
    let result = {
        id_conseling: request.params.id,
        conseling_result: request.body.conseling_result,
        // tipe_user: "teacher",
        // counseling: request.body.Chat
    }


    counselingResultModel.create(result)
    .then(async (result) => {
        return response.json({
            message: "success",
            status: true,
            data: result            
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
    // conselingModel.create(newConseling)
    //     .then(async (result) => {

    //         let id = result.id_conseling

            // let idTeacher = result.id_teacher

            // const tipeUserFromRequest = request.body.tipe_user;

            // const isValidTipeUser = await onlineModel.exists({ value: tipeUserFromRequest });

            // let conseling_result = {
            //     id_conseling: id,
                // id_user: idTeacher,
                // conseling_result: request.body.conseling_result
                // counseling: request.body.counseling
            // };

            // counselingResultModel.create(conseling_result)
            //     .then(async (result) => {
            //         return response.json({
            //              message: 'success',
            //              status: true,
            //              data: result, 
            //             })
            //     })


        // })
        // .catch(error => {
        //     return response.json({
        //         message: error.message
        //     })
        // })
}