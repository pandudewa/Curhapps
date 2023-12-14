const { response } = require('../route/conseling_route')

const conselingModel = require(`../models/index`).conseling
const onlineModel = require(`../models/index`).online
const studentModel = require(`../models/index`).student
const teacherModel = require(`../models/index`).teacher
const counselingResultModel = require('../models/index').counseling_result
const Op = require(`sequelize`).Op
const sequelize = require('../config/connect_db').sequelize
const seq = require(`sequelize`)
const { getUserLogin } = require('../auth/auth')

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("curhapss", "bk", "magangjesicabk", {
//     host: "127.0.0.1",
//     dialect: "mysql",
// })

exports.addOnlineStudent = async (request, response) => {
    user = getUserLogin(request)

    let newConseling = {
        id_student: user.id_user,
        id_teacher: request.body.id_teacher,
        category: 'online',
        isclosed: false,
    }

    const conseling = await conselingModel.findAll({
        where: [
            {id_teacher: request.body.id_teacher },
            {id_student: user.id_user },
            {isclosed: false },
        ]
    })

    if (conseling.length > 0) {
        return response.json({
            status: false,
            message: 'anda belum bisa konseling dengan guru bk ini karena masih ada konseling yang belum terselesaikan',
        })
    }

    conselingModel.create(newConseling)
        .then(async (result) => {

            let id = result.id_conseling

            let idStudent = result.id_student

            // const tipeUserFromRequest = request.body.tipe_user;

            // const isValidTipeUser = await onlineModel.exists({ value: tipeUserFromRequest });

            let onLine = {
                id_conseling: id,
                id_user: idStudent,
                tipe_user: 'student',
                counseling: request.body.counseling
            };

            onlineModel.create(onLine)
                .then(async (result) => {
                    return response.json({ status: true, data: result })
                })


        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}

exports.addOnlineTeacher = async (request, response) => {
    user = getUserLogin(request)

    let newConseling = {
        id_student: user.id_user,
        id_teacher: request.body.id_teacher,
        category: 'online',
        isclosed: false,
    }


    conselingModel.create(newConseling)
        .then(async (result) => {

            let id = result.id_conseling

            let idTeacher = result.id_teacher

            // const tipeUserFromRequest = request.body.tipe_user;

            // const isValidTipeUser = await onlineModel.exists({ value: tipeUserFromRequest });

            let onLine = {
                id_conseling: id,
                id_user: idTeacher,
                tipe_user: 'teacher',
                counseling: request.body.counseling
            };

            onlineModel.create(onLine)
                .then(async (result) => {
                    return response.json({ status: true, data: result })
                })


        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}

exports.getAllOnline = async (request, response) => {
    // try {
    let id = request.params.id
    // let online = await onlineModel.findAll({
    //     attributes: ['id_online','id_user', 'tipe_user', 'counseling', 'createdAt'],
    //     order: [['createdAt', 'DESC']],
    //     where: { id_conseling: id },
    //     include: [
    //         {
    //         model:  conselingModel,
    //         // where: { id_teacher: Sequelize.literal('`onlineModel`.`id_teacher` = `teacherModel`.`id_teacher`') },
    //         required: true,
    //         as: 'conseling',
    //         },
    //     ], 
    // });
    let online = await sequelize.query('select if(tipe_user="student",(select student_name from student where id_student = id_user),(select teacher_name from teacher where id_teacher = id_user)) as nama_user, if(tipe_user="student",(select photo from student where id_student = id_user),(select photo from teacher where id_teacher = id_user)) as photo, online.* from online where id_conseling = ' + id)
    return response.json({
        message: 'success',
        status: true,
        data: online[0],
        jumlah_data: online[0].length
    });

    // } catch (error) {
    //     console.error('Error:', error);
    //     return response.status(500).json({
    //         message: 'Internal Server Error',
    //         status: false,
    //         data: error,
    //     });
    // }
};

exports.getChatSiswa = async (request, response) => {
    // try {

    //     user = getUserLogin(request)

    //     let online = await sequelize.query('SELECT c.id_conseling, sp.*, th.id_teacher, th.teacher_name, th.nik, th.photo as photo_teacher ,(select count(*) from online o where o.id_user=c.id_teacher and o.tipe_user="teacher" and o.id_conseling = c.id_conseling ) as jumlah_chat FROM student sp join conseling c on c.id_student = sp.id_student join teacher th on th.id_teacher = c.id_teacher join online  op on op.id_conseling=c.id_conseling where c.isclosed = 0 and c.id_student = ' + user.id_user + ' group by c.id_conseling')
    //     return response.json({
    //         message: 'success',
    //         status: true,
    //         data: online[0],
    //     });

    // } catch (error) {
    //     console.error('Error:', error);
    //     return response.status(500).json({
    //         message: 'Internal Server Error',
    //         status: false,
    //         data: error,
    //     });
    // }

    try {
        
        user = getUserLogin(request)
        let online = await sequelize.query('SELECT c.id_conseling, sp.*, th.id_teacher, th.teacher_name, th.nik, th.photo as photo_teacher ,(select count(*) from online o where o.id_user=c.id_teacher and o.tipe_user="teacher" and o.id_conseling = c.id_conseling ) as jumlah_chat FROM student sp join conseling c on c.id_student = sp.id_student join teacher th on th.id_teacher = c.id_teacher join online  op on op.id_conseling=c.id_conseling where c.isclosed = 0 and c.id_student = ' + user.id_user + ' group by c.id_conseling')
        
    
        let id_teacher = request.params.id_teacher
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
        });

        
        const combinedData = {
            chatSiswa: {
                message: 'success',
                status: true,
                data: online[0],
            },
            rating: {},
        };

        if (conseling.length > 0) {
            const totalRating = conseling.reduce((sum, result) => sum + result.rating, 0);
            const rataRating = totalRating / conseling.length;
            const getGuru = await teacherModel.findOne({
                where: { id_teacher: id_teacher }
            });

            combinedData.rating = { 
                id_teacher: id_teacher,
                teacher_name: getGuru.teacher_name,
                rating: rataRating.toFixed(2),
            };
        } else {
            combinedData.rating = {
                message: 'No rating found.',
                status: false,
                data: null
            };
        }

        
        return response.json(combinedData);
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: error,
        });
    }
};

exports.getChatGuru = async (request, response) => {
    try {

        user = getUserLogin(request)

        let online = await sequelize.query('SELECT c.id_conseling, sp.*, st.id_student, st.nis, st.student_name, st.photo as photo_student, st.phone, st.class ,(select count(*) from online o where o.id_user=c.id_student and o.tipe_user="student" and o.id_conseling = c.id_conseling ) as jumlah_chat FROM teacher sp join conseling c on c.id_teacher = sp.id_teacher join student st on st.id_student = c.id_student join online op on op.id_conseling=c.id_conseling where c.isclosed = 0 and c.id_teacher = ' + user.id_user + ' group by c.id_conseling')
        return response.json({
            message: 'success',
            status: true,
            data: online[0],
        });
    } catch (error) {
        console.error('Error:', error);
        return response.status(500).json({
            message: 'Internal Server Error',
            status: false,
            data: error,
        });
    }
};

exports.insertChatSiswa = async (request, response) => {
    const user = getUserLogin(request)

    if (!request.body.Chat) {
        return response.json({
            message: "Invalid data. 'Chat' is required.",
            status: false
        });
    }

    let Chat = {
        id_conseling: request.params.id,
        id_user: user.id_user,
        tipe_user: "student",
        counseling: request.body.Chat
    }

    const where = await conselingModel.findOne(
        {
            where: [
                { isclosed: false },
                { id_conseling: request.params.id }
            ]
        },
    );

    if (where) {
        onlineModel.create(Chat)
            .then(async (result) => {
                return response.json({
                    message: "success",
                    status: true,
                    data: result
                })
            })
            .catch(error => {
                return response.json({
                    message: error.message,
                    status: false
                })
            })
    } else {
        return response.json({
            message: "No open counseling found.",
            status: false
        });
    }
}

exports.insertChatGuru = async (request, response) => {
    const user = getUserLogin(request)

    if (!request.body.Chat) {
        return response.json({
            message: "Invalid data. 'Chat' is required.",
            status: false
        });
    }

    let Chat = {
        id_conseling: request.params.id,
        id_user: user.id_user,
        tipe_user: "teacher",
        counseling: request.body.Chat
    }

    const where = await conselingModel.findOne(
        {
            where: [
                { isclosed: false },
                { id_conseling: request.params.id }
            ]
        },
    );

    if (where) {
        onlineModel.create(Chat)
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
    } else {
        return response.json({
            message: "No open counseling found.",
            status: false
        });
    }
}
