const conselingModel = require(`../models/index`).conseling
const teacherModel = require(`../models/index`).teacher
const offlineModel = require(`../models/index`).offline
const counselingResultModel = require('../models/index').counseling_result
const onlineModel = require('../models/index').online

exports.upcomingAppointment = async (request, response) => {
    const conseling = await conselingModel.findOne({
        attributes: ['id_conseling'],
        isclosed: false,
        include:
            [
                {
                    attributes: ['teacher_name'],
                    model: teacherModel,
                    required: true,
                    as: 'teacher'
                },
                {
                    attributes: ['meeting_date', 'aproval'],
                    model: offlineModel,
                    required: true,
                    where: {
                        aproval: true
                    },
                    as: 'offline'
                }
            ],
    })
    return response.json({
        message: 'success',
        status: true,
        data: conseling
    });

};

exports.lastCounseling = async (request, response) => {
    const conseling = await conselingModel.findOne({
        attributes: ['id_conseling'],
        isclosed: false,
        order: [[ 'id_conseling', 'DESC' ]],
        include:
            [
                {
                    attributes: ['teacher_name'],
                    model: teacherModel,
                    required: true,
                    as: 'teacher'
                },
                {
                    attributes: ['meeting_date'],
                    model: offlineModel,
                    required: true,
                    // where: {
                    //     aproval: true
                    // }
                    as: "offline"
                },
                {
                    attributes: ['rating'],
                    model: counselingResultModel,
                    required: true,
                    as: 'counseling_result'
                }
            ],
    })
    return response.json({
        message: 'success',
        status: true,
        data: conseling
    });
};
 
// exports.upcomingOnline = async (request, response) => {
//     const conseling = await conselingModel.findOne({
//         attributes: ['id_conseling'],
//         include:
//             [
//                 {
//                     attributes: ['teacher_name'],
//                     model: teacherModel,
//                     required: true,
//                     as: 'teacher'
//                 },
//                 {
//                     attributes: ['meeting_date', 'aproval'],
//                     model: offlineModel,
//                     required: true,
//                     // where: {
//                     //     aproval: true
//                     // },
//                     as: 'offline'
//                 }
//             ],
//     })
//     return response.json({
//         message: 'success',
//         status: true,
//         data: conseling
//     });
// }

exports.countOffline = async (request, response) => {

}