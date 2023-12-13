const { response, request } = require('../route/conseling_route')
const conselingModel = require(`../models/index`).conseling
const counselingResultModel = require('../models/index').counseling_result
const onlineModel = require(`../models/index`).online
const studentModel = require(`../models/index`).student
const teacherModel = require(`../models/index`).teacher
const offlineModel = require('../models/index').offline
const Op = require(`sequelize`).Op
const sequelize = require('../config/connect_db').sequelize
const seq = require(`sequelize`)
const { getUserLogin } = require('../auth/auth')

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

// exports.getAllResult = async (request, response) => {
//     try {
//         let id_conseling = request.params.id

//         let counselingResult = await counselingResultModel.findAll({
//             where: {
//                 id_conseling: id_conseling,
//             },
//         })
//         return response.json({
//             success: true,
//             data: counselingResult,
//             message: `All result have been loaded`,
//         });
//     } catch (error) {
//         console.error('Error in getAllResult:', error);
//         return response.status(500).json({
//             success: false,
//             data: null,
//             message: 'Internal Server Error',
//         });
// }

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
// };

exports.conselingClosedStudent = async (request, response) => {
    user = getUserLogin(request)

    let online = await sequelize.query(" SELECT teacher_name, c.id_conseling, c.createdAt as date, c.id_student, st.student_name, c.category, 'true' as aproval, isclosed, conseling_result  FROM conseling c " +
        "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join counseling_result cr on cr.id_conseling = c.id_conseling " +
        "where  category = 'online' and isclosed = 1 and c.id_student = " + user.id_user + "  " +
        "UNION ALL " +
        "SELECT teacher_name, c.id_conseling, meeting_date as date, c.id_student, st.student_name, c.category, aproval, isclosed, conseling_result FROM conseling c " +
        "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join offline o on o.id_conseling = c.id_conseling join counseling_result cr on cr.id_conseling = c.id_conseling  " +
        "where  category = 'offline' and isclosed = 1 and c.id_student = " + user.id_user + " ")
    return response.json({
        message: 'success',
        status: true,
        data: online[0],
        jumlah_data: online[0].length
    });
};

exports.conselingClosedTeacher = async (request, response) => {
    user = getUserLogin(request)

    let online = await sequelize.query(" SELECT teacher_name, c.id_conseling, c.createdAt as date, c.id_student, st.student_name, c.category, 'true' as aproval, isclosed, conseling_result  FROM conseling c " +
        "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join counseling_result cr on cr.id_conseling = c.id_conseling " +
        "where  category = 'online' and isclosed = 1 and c.id_teacher = " + user.id_user + "  " +
        "UNION ALL " +
        "SELECT teacher_name, c.id_conseling, meeting_date as date, c.id_student, st.student_name, c.category, aproval, isclosed, conseling_result FROM conseling c " +
        "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join offline o on o.id_conseling = c.id_conseling join counseling_result cr on cr.id_conseling = c.id_conseling  " +
        "where  category = 'offline' and isclosed = 1 and c.id_teacher = " + user.id_user + " ")
    return response.json({
        message: 'success',
        status: true,
        data: online[0],
        jumlah_data: online[0].length
    });
};

exports.addRating = async (request, response) => {
    let id_conseling = request.params.id;

    let result = { 
        rating: request.body.rating,
    }

    const cekrating = await counselingResultModel.findOne({
        where:{
            id_conseling:id_conseling,
            rating: null
        }
    })
    if(!cekrating){
        return response.json({
            message: 'consuling ini sudah diberi rating',
            status: false
        })
    }
    counselingResultModel.update(result , {
        where: { id_conseling: id_conseling }
    })
    .then(async (result) => {
        return response.json({
            message: "success",
            status: true,
        })
    })
    .catch(error => {
        return response.json({
            message: error.message,
            status: false
        })
    })
}

exports.getRating = async (request, response) => {
    let id_teacher = request.params.id_teacher

    try {
        const conseling = await counselingResultModel.findAll({
            attributes: ['rating', 'id_counseling_result',[seq.col('conseling.id_conseling'), 'id_conseling'],[seq.col('conseling.teacher.teacher_name'),'teacher_name']],
            order: [['createdAt', 'DESC']],
            where: { 
                rating: {
                [seq.Op.not]: null
                }
             },
            include: [
                {
                    attributes: [],
                    model: conselingModel,
                    required: true,
                    as: 'conseling',
                    where: {
                        isclosed: true,              
                        id_teacher: id_teacher
                    },
                    include:[
                        {
                            attributes: [],
                            model: teacherModel,
                            required: true,
                            as: 'teacher'
                        },
                    ]
                },
            ],
        }
        );

        if (conseling.length > 0) {
            const totalRating = conseling.reduce((sum, result) => sum + result.rating, 0);
            const rataRating = totalRating / conseling.length;
            const getGuru = await teacherModel.findOne({
                where: { id_teacher: id_teacher }
            })
            let result = { 
                id_teacher: id_teacher,
                teacher_name: getGuru.teacher_name,
                rating: rataRating.toFixed(2),
             }
            return response.json({
                message: 'success',
                status: true,
                data: {
                    // rating: conseling,
                    rating: result
                }
            });
        } else {
            return response.json({
                message: 'No rating found.',
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
};

exports.conselingResult = async (request, response) => {
    const user = getUserLogin(request)

    const conseling = await counselingResultModel.findAll({
        
        // where: { isclosed: false },
        include:
            [
                {
                    attributes: ['isclosed'],
                    model: conselingModel,
                    required: true,
                    where: {
                        isclosed: true,
                        id_teacher: user.id_user
                    },
                    include:[
                        {
                            model: studentModel,
                            attributes: ['id_student', 'student_name'],
                            as: 'student'
                        },{
                            model: teacherModel,
                            attributes: ['id_teacher','teacher_name'],
                            as: 'teacher'
                        }
                    ],
                    as: 'conseling'
                },
            ],
    })
    return response.json({ data: conseling });
};