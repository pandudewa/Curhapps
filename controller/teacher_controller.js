const teacherModel = require(`../models/index`).teacher
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

        let Token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY)

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