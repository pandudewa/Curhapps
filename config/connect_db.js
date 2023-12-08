const Sequelize = require("sequelize");
const sequelize = new Sequelize("curhapss", "bk", "magangjesicabk", {
    host: "127.0.0.1",
    dialect: "mysql",
})

exports = {sequelize}