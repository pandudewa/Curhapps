const { response } = require('../route/conseling_route')
const conselingModel = require(`../models/index`).conseling
const counselingResultModel = require('../models/index').counseling_result
const onlineModel = require(`../models/index`).online
const studentModel = require(`../models/index`).student
const teacherModel = require(`../models/index`).teacher
const offlineModel = require('../models/index').offline
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

    let online = await sequelize.query(" SELECT teacher_name, c.id_conseling, c.createdAt as date, c.id_student, st.student_name, c.category, 'true' as aproval, isclosed, conseling_result  FROM conseling c "+
    "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join counseling_result cr on cr.id_conseling = c.id_conseling "+  
    "where  category = 'online' and isclosed = 1 and c.id_student = "+user.id_user+"  "+ 
    "UNION ALL "+
    "SELECT teacher_name, c.id_conseling, meeting_date as date, c.id_student, st.student_name, c.category, aproval, isclosed, conseling_result FROM conseling c "+
    "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join offline o on o.id_conseling = c.id_conseling join counseling_result cr on cr.id_conseling = c.id_conseling  "+
    "where  category = 'offline' and isclosed = 1 and c.id_student = "+user.id_user+" ")
    return response.json({
        message: 'success',
        status: true,
        data: online[0],
        jumlah_data: online[0].length
    });
};

exports.conselingClosedTeacher = async (request, response) => {
    user = getUserLogin(request)

    let online = await sequelize.query(" SELECT teacher_name, c.id_conseling, c.createdAt as date, c.id_student, st.student_name, c.category, 'true' as aproval, isclosed, conseling_result  FROM conseling c "+
    "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join counseling_result cr on cr.id_conseling = c.id_conseling "+  
    "where  category = 'online' and isclosed = 1 and c.id_teacher = "+user.id_user+"  "+ 
    "UNION ALL "+
    "SELECT teacher_name, c.id_conseling, meeting_date as date, c.id_student, st.student_name, c.category, aproval, isclosed, conseling_result FROM conseling c "+
    "join teacher t on t.id_teacher = c.id_teacher join student st on st.id_student = c.id_student join offline o on o.id_conseling = c.id_conseling join counseling_result cr on cr.id_conseling = c.id_conseling  "+
    "where  category = 'offline' and isclosed = 1 and c.id_teacher = "+user.id_user+" ")
    return response.json({
        message: 'success',
        status: true,
        data: online[0],
        jumlah_data: online[0].length
    });
};