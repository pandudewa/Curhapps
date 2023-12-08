const Sequelize = require("sequelize");
const sequelize = new Sequelize("curhapss", "bk", "magangjesicabk", {
    host: "103.93.130.122",
    dialect: "mysql",
})

exports = sequelize