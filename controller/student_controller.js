const studentModel = require(`../models/index`).student
const md5 = require(`md5`)
const Op = require(`sequelize`).Op
const jsonwebtoken = require(`jsonwebtoken`)
const SECRET_KEY = "secretcode"


exports.Login = async (request, response) => {
    try {
        const params = {
            nis: request.body.nis,
            password: md5(request.body.password)
        };

        console.log(params.nis)

        const findStudent = await studentModel.findOne({ where: params })
        if (findStudent == null) {
            return response.status(200).json({
                status: false,
                message: "NIS or password doesn't match",
            })
        }

        console.log(findStudent)

        let tokenPayLoad = {
            id: findStudent.nis,
            id_user: findStudent.id_student,
            password: findStudent.password,
            photo: findStudent.photo,
            address: findStudent.address,
            phone: findStudent.phone,
            class: findStudent.class
        }

        tokenPayLoad = JSON.stringify(tokenPayLoad)

        let Token = await jsonwebtoken.sign(tokenPayLoad, SECRET_KEY)

        return response.status(200).json({
            status: true,
            message: "Authentication success",
            data: {
                token: Token,
                nis: findStudent.nis,
                student_name: findStudent.student_name,
                id_student: findStudent.id_student,
                photo: findStudent.photo
            }
        })
    } catch (error) {

        console.log(error)

        return response.status(500).json({
            message: "Internal error",
            err: error
        });
    };
};

exports.getAllStudent = async (request, response) => {
    let student = await studentModel.findAll({
        attributes:[
            'id_student','nis','student_name', 'photo'
        ]
    })

    return response.json({
        success: true,
        data: student,
        message: `All student have been loaded`,
    })
};