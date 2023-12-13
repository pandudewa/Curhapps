const teacherModel = require(`../models/index`).teacher
const conselingModel = require(`../models/index`).conseling
const studentModel = require(`../models/index`).student
const offlineModel = require(`../models/index`).offline
const md5 = require(`md5`)
const Op = require(`sequelize`).Op
const jsonwebtoken = require(`jsonwebtoken`)
const SECRET_KEY = "secretcode"
 


exports.Login = async (request, response) => {
    try {
        const params = {
            nik: request.body.nik,
            password: md5(request.body.password)
        };

        console.log(params.nik)

        const findTeacher = await teacherModel.findOne({ where: params })
        if (findTeacher == null) {
            return response.status(200).json({
                status: false,
                message: "NIK or password doesn't match",
            })
        }

        console.log(findTeacher)

        let tokenPayLoad = {
            id: findTeacher.nik,
            id_user: findTeacher.id_teacher,
            password: findTeacher.password,
            photo: findTeacher.photo,
            address: findTeacher.address,
            phone: findTeacher.phone,
            class: null
        }

        tokenPayLoad = JSON.stringify(tokenPayLoad)

        let Token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY)

        return response.status(200).json({
            status: true,
            message: "Authentication success",
            data: {
                token: Token,
                nik: findTeacher.nik,
                teacher_name: findTeacher.teacher_name,
                id_teacher: findTeacher.id_teacher,
                photo: findTeacher.photo
            }
        })
    } catch (error) {

        console.log(error)

        return response.status(500).json({
            message: "Internal errors",
            err: error
        });
    };
};

exports.requestAppointment = async (request, response) => {
    const counseling = await conselingModel.findAll({
        attributes: ['id_conseling'],
        include:
            [
                {
                    attributes: ['student_name'],
                    model: studentModel,
                    required: true,
                    as: 'student'
                },
                {
                    attributes: [],
                    model: teacherModel,
                    required: true,
                    as: 'teacher'
                },
                {
                    attributes: ['meeting_date', 'aproval'],
                    model: offlineModel,
                    required: true,
                    where: {
                        aproval: null
                    }
                }
            ],
    })
    return response.json({ data: counseling });
};

exports.approveAppointment = async (request, response) => {
    const id_conseling = request.params.id
    const data = { aproval: true }
    try {
        const conseling = await offlineModel.update(data, { where: { id_conseling: id_conseling } })
        return response.json({
            message: 'success',
            status: true,
            data: data
        })
    }
    catch(error){
        return response.json({
            message: 'failed',
            status: false,
            err: error
        })
    }
};
exports.rejectAppointment = async (request, response) => {
    const id_conseling = request.params.id
    const data = { aproval: false};
    const isclosed = { isclosed: true };
    try {
        const conseling = await offlineModel.update(data, { where: { id_conseling: id_conseling } })
        const setClosed = await conselingModel.update(isclosed, { where: { id_conseling: id_conseling } })
        return response.json({
            message: 'success',
            status: true,
        })
    }
    catch(error){
        return response.json({
            message: 'failed',
            status: false,
            err: error
        })
    }
};

exports.getAllTeacher = async (request, response) => {

    // let online = await onlineModel.findAll({
    //     include: [{
    //         model: conselingModel,
    //         as: 'conseling',
    //         required: true,
    //         include: [{
    //             model: studentModel,
    //             as: "student",
    //             required: true,
    //             attributes:[
    //                 'id_student','nis','student_name', 'photo'
    //             ],
    //         }] 
    //     }]
    // })

    // return response.json({
    //     success: true,
    //     data: online,
    //     jumlah_data:online.length,
    //     message: `All student have been loaded`,
    // })

    let teacher = await teacherModel.findAll({
        attributes:[
            'id_teacher','teacher_name','photo'
        ]
    })

    return response.json({
        success: true,
        data: teacher,
        message: `All teacher have been loaded`,
    })
};