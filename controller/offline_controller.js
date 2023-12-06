const conselingModel = require(`../models/index`).conseling
const studentModel = require(`../models/index`).student
const offlineModel = require(`../models/index`).offline


exports.dataOffline = async (request, response) => {
    const conseling = await conselingModel.findAll({
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
                    attributes: ['meeting_date', 'aproval'],
                    model: offlineModel,
                    required: true,
                    where: {
                        aproval: true
                    }
                }
            ],
    })
    return response.json({ data: conseling });
};