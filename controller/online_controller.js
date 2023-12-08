const { response } = require('../route/conseling_route')

const conselingModel = require(`../models/index`).conseling
const onlineModel = require(`../models/index`).online
const studentModel = require(`../models/index`).student
const teacherModel = require(`../models/index`).teacher
const Op = require(`sequelize`).Op
const sequelize = require('../config/connect_db').sequelize
const {getUserLogin} = require('../auth/auth')

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("curhapss", "bk", "magangjesicabk", {
//     host: "127.0.0.1",
//     dialect: "mysql",
// })

exports.addOnlineStudent = async (request, response) => {
    let newConseling = {
        id_student: request.body.id_student,
        id_teacher: request.body.id_teacher,
        category: 'online',
        isclosed: false,
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
                tipe_user: request.body.tipe_user,
                counseling: request.body.counseling
            };

            onlineModel.create(onLine)
                .then(async (result) => {
                    return response.json({ data: result })
                })


        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.addOnlineTeacher = async (request, response) => {
    let newConseling = {
        id_student: request.body.id_student,
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
                tipe_user: request.body.tipe_user,
                counseling: request.body.counseling
            };

            onlineModel.create(onLine)
                .then(async (result) => {
                    return response.json({ data: result })
                })


        })
        .catch(error => {
            return response.json({
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
    try {

        let online = await sequelize.query('SELECT c.id_conseling, sp.*, (select count(*) from online o where o.id_user=sp.id_student and o.tipe_user="student" and o.id_conseling = c.id_conseling ) as jumlah_chat FROM student sp join online  op on op.id_user=sp.id_student join conseling c on c.id_conseling = op.id_conseling where c.isclosed = 0 group by c.id_conseling')
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

exports.getChatGuru = async (request, response) => {
    try {

        let online = await sequelize.query('SELECT c.id_conseling, sp.*, (select count(*) from online o where o.id_user=sp.id_teacher and o.tipe_user="teacher" and o.id_conseling = c.id_conseling ) as jumlah_chat FROM teacher sp join online op on op.id_user=sp.id_teacher join conseling c on c.id_conseling = op.id_conseling where c.isclosed = 0 group by c.id_conseling')
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
    user = getUserLogin(request)

    let Chat = {
        id_conseling: request.params.id,
        id_user: user.id_student,
        tipe_user: "student",
        counseling: request.body.Chat
    }


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
}

exports.insertChatGuru = async (request, response) => {
    user = getUserLogin(request) 
    let Chat = {
        id_conseling: request.params.id,
        id_user: user.id_teacher,
        tipe_user: "teacher",
        counseling: request.body.Chat
    }


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
}
