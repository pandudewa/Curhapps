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
            return response.status(404).json({
                message: "NIK or password doesn't match",
                err: ''
            })
        }

        console.log(findTeacher)

        let tokenPayLoad = {
            nik: findTeacher.nik,
            password: findTeacher.password
        }

        tokenPayLoad = JSON.stringify(tokenPayLoad)

        let Token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY,)

        return response.status(200).json({
            status: true,
            message: "Authentication success",
            data: {
                token: Token,
                nik: findTeacher.nik,
                teacher_name: findTeacher.teacher_name
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
exports.requestAppointment= async (request, response)=>{
    const counseling = await conselingModel.findAll({
        attributes: ['id_conseling'],
        include: {
            attributes: ['student_name'],
            model: studentModel,
            required: true,
            as : 'student'
        },
        include:{
            attributes: [],
            model: teacherModel,
            required: true,
            as : 'teacher'
        },
        include:{
            attributes: ['meeting_date','aproval'],
            model: offlineModel,
            required: true,
            where:{
                aproval: null
            }
        },
    })
    return response.json({data:counseling});
};