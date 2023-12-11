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
    }


    counselingResultModel.create(result)
    .then(async (result) => {

        await conselingModel.update({ isclosed: true }, {
            where: { id_conseling: result.id_conseling }
        });

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
}

exports.getAllConselingResult = async (request, response) => {
    let counseling_result = await counselingResultModel.findAll({
        // attributes:[
        //     'id_student','nis','student_name', 'photo'
        // ]
    })

    return response.json({
        success: true,
        data: counseling_result,
        message: `All result have been loaded`,
    })
};