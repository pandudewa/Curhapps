const conselingModel = require(`../models/index`).conseling
const teacherModel = require(`../models/index`).teacher
const offlineModel = require(`../models/index`).offline
const counselingResultModel = require('../models/index').counseling_result
const onlineModel = require('../models/index').online
const { getUserLogin } = require('../auth/auth')

exports.upcomingAppointment = async (request, response) => {
    user = getUserLogin(request)

    try {
        const conseling = await conselingModel.findOne({
            attributes: ['id_conseling'],
            where: {
                isclosed: false,
                id_student: user.id_user
            },
            include: [
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
        });

        if (conseling) {
            return response.json({
                message: 'success',
                status: true,
                data: conseling
            });
        } else {
            return response.json({
                message: 'No upcoming appointment found for the specified student.',
                status: false,
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }


    //     const { id_student } = request.params.id

    //     try{
    //     const conseling = await conselingModel.findOne({
    //         attributes: ['id_conseling'],
    //         isclosed: false,
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
    //                     where: {
    //                         aproval: true
    //                     },
    //                     as: 'offline'
    //                 }
    //             ],
    //     })
    //     return response.json({
    //         message: 'success',
    //         status: true,
    //         data: conseling
    //     });

};

exports.lastCounseling = async (request, response) => {
    user = getUserLogin(request)

    try {
        const conseling = await conselingModel.findOne({
            attributes: ['id_conseling'],
            where: {
                isclosed: false,
                id_student: user.id_user
            },
            order: [['id_conseling', 'DESC']],
            include: [
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
                    as: 'offline'
                },
                {
                    attributes: ['rating'],
                    model: counselingResultModel,
                    required: true,
                    as: 'counseling_result'
                }
            ],
        });

        if (conseling) {
            return response.json({
                message: 'success',
                status: true,
                data: conseling
            });
        } else {
            return response.json({
                message: 'No counseling found for the specified student.',
                status: false,
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }



    // const conseling = await conselingModel.findOne({
    //     attributes: ['id_conseling'],
    //     isclosed: false,
    //     order: [[ 'id_conseling', 'DESC' ]],
    //     include:
    //         [
    //             {
    //                 attributes: ['teacher_name'],
    //                 model: teacherModel,
    //                 required: true,
    //                 as: 'teacher'
    //             },
    //             {
    //                 attributes: ['meeting_date'],
    //                 model: offlineModel,
    //                 required: true,
    //                 // where: {
    //                 //     aproval: true
    //                 // }
    //                 as: "offline"
    //             },
    //             {
    //                 attributes: ['rating'],
    //                 model: counselingResultModel,
    //                 required: true,
    //                 as: 'counseling_result'
    //             }
    //         ],
    // })
    // return response.json({
    //     message: 'success',
    //     status: true,
    //     data: conseling
    // });
};

exports.upcomingOnline = async (request, response) => {
    user = getUserLogin(request)

    try {
        const conseling = await conselingModel.findOne({
            attributes: ['id_conseling', ['createdAt', 'meeting_date']],
            order: [['id_conseling', 'DESC']],
            where: {
                isclosed: false,
                id_student: user.id_user
            },
            include: [
                {
                    attributes: ['teacher_name'],
                    model: teacherModel,
                    required: true,
                    as: 'teacher'
                },
                // Add the onlineModel with necessary attributes and conditions if needed
                // {
                //     attributes: [['createdAt','meeting_date']],
                //     model: onlineModel,
                //     required: true,
                //     as: 'online'
                // }
            ],
        });

        if (conseling) {
            return response.json({
                message: 'success',
                status: true,
                data: conseling
            });
        } else {
            return response.json({
                message: 'No upcoming online counseling found for the specified student.',
                status: false,
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }


    // const conseling = await conselingModel.findOne({
    //     attributes: ['id_conseling', ['createdAt', 'meeting_date']],
    //     order: [['id_conseling', 'DESC']],
    //     isclosed: false,
    //     include:
    //         [
    //             {
    //                 attributes: ['teacher_name'],
    //                 model: teacherModel,
    //                 required: true,
    //                 as: 'teacher'
    //             },
    //             // {
    //             //     attributes: [['createdAt','meeting_date']],
    //             //     model: onlineModel,
    //             //     required: true,
    //             //     as: 'online'
    //             // }
    //         ],
    // })
    // return response.json({
    //     message: 'success',
    //     status: true,
    //     data: conseling
    // });

};

exports.lastCounselingOnline = async (request, response) => {
    user = getUserLogin(request)

    try {
        const conseling = await conselingModel.findOne({
            attributes: ['id_conseling', ['createdAt', 'meeting_date']],
            order: [['id_conseling', 'DESC']],
            where: {
                isclosed: false,
                id_student: user.id_user
            },
            include: [
                {
                    attributes: ['teacher_name'],
                    model: teacherModel,
                    required: true,
                    as: 'teacher'
                },
                {
                    attributes: ['rating'],
                    model: counselingResultModel,
                    required: true,
                    as: 'counseling_result'
                }
            ],
        });

        if (conseling) {
            return response.json({
                message: 'success',
                status: true,
                data: conseling
            });
        } else {
            return response.json({
                message: 'No last online counseling found for the specified student.',
                status: false,
                data: null
            });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: null
        });
    }


    // const conseling = await conselingModel.findOne({
    //     attributes: ['id_conseling', ['createdAt', 'meeting_date']],
    //     order: [['id_conseling', 'DESC']],
    //     isclosed: false,
    //     include:
    //         [
    //             {
    //                 attributes: ['teacher_name'],
    //                 model: teacherModel,
    //                 required: true,
    //                 as: 'teacher'
    //             },
    //             {
    //                 attributes: ['rating'],
    //                 model: counselingResultModel,
    //                 required: true,
    //                 as: 'counseling_result'
    //             }
    //         ],
    // })
    // return response.json({
    //     message: 'success',
    //     status: true,
    //     data: conseling
    // });
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

    try {
        let countOffline = await conselingModel.findAll({
            where: {
                category: 'offline',
                isclosed: true,
            },
        })
        return response.json({
            success: true,
            data_count: countOffline.length,
            message: `All offline have been loaded`,
        });
    } catch (error) {
        console.error('Error in getAllResult:', error);
        return response.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error',
        });
    }
}

exports.countOnline = async (request, response) => {

    try {
        let countOnline = await conselingModel.findAll({
            where: {
                category: 'online',
                isclosed: true,
            },
        })
        return response.json({
            success: true,
            data_count: countOnline.length,
            message: `All online have been loaded`,
        });
    } catch (error) {
        console.error('Error in getAllResult:', error);
        return response.status(500).json({
            success: false,
            data: null,
            message: 'Internal Server Error',
        });
    }
}