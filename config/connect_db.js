const Sequelize = require("sequelize");
exports.sequelize = new Sequelize("curhapss", "bk", "magangjesicabk", {
    host: "127.0.0.1",
    dialect: "mysql",
})