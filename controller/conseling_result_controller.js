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

exports.getAllResult = async (request, response) => {
    try {
        let id_conseling = request.params.id

        let counselingResult = await counselingResultModel.findAll({
            where: {
                id_conseling: id_conseling,
            },
        })
        return response.json({
            success: true,
            data: counselingResult,
            message: `All result have been loaded`,
        });
    } catch (error) {
        console.error('Error in getAllResult:', error);
        return response.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error',
        });
    }
    
    // let counselingResult = await counselingResultModel.findAll({
    //     // attributes:[
    //     //     'id_student','nis','student_name', 'photo'
    //     // ]
    // })

    // return response.json({
    //     success: true,
    //     data: counselingResult,
    //     message: `All result have been loaded`,
    // })
};