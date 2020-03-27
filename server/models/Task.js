const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
	"tasks",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		task_name: {
			type: Sequelize.STRING,
		},
		task_description: {
			type: Sequelize.STRING,
		},
		completed: {
			type: Sequelize.TINYINT,
		},
	},
	{
		timestamps: false,
	}
)
