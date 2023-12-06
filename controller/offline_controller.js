const { conseling, offline } = require('./models');


exports.findOffline = (response) => {
    try {
        const aproval = true;

        const data = offline.findOne({
            attributes: ['id_conseling', 'meeting_date', 'aproval'],
            include: [{
                model: conseling,
                attributes: ['id_student', 'isclosed'],
                where: { boolean_column: aproval }
            }]


        })
        return response.json({
            message: 'success',
            status: true,
            data: data
        })
    } catch (error) {
        console.log(error)

        return response.status(500).json({
            message: "Internal errors",
            err: error
        });
    }
}