const config = require('./');

module.exports = {
	username: config.db_user,
	password: config.db_password,
	database: config.db_name,
	host: config.db_host,
	dialect: config.db_dialect,
	define: {
		charset: 'utf8',
		dialectOptions: {
			collate: 'utf8_general_ci',
		},
	},
};
