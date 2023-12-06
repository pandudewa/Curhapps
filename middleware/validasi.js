const Joi = require('joi');

exports.validateStudent =  (  (req, res, next) => {
    const { body } = req; 
    const blogSchema = Joi.object({
        nis: Joi.string().required(),
        password: Joi.string().required()
    });
    const result = blogSchema.validate(body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.status(422).json({
            message: 'invalid request',
            data: error
        })
    } else {
        next();
    }
});

exports.validateTeacher = ( (req, res, next) => {
    const { body } = req; 
    const blogSchema = Joi.object({
        nik: Joi.string().required(),
        password: Joi.string().required()
    });
    const result = blogSchema.validate(body);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
        res.status(422).json({
            message: 'invalid request',
            data: error
        })
    } else {
        next();
    }
});