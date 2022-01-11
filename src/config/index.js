require('dotenv').config();

module.exports = {
	app_env: process.env.APP_ENV || 'development',
	app_port: process.env.APP_PORT || '3000',
	db_dialect: process.env.DB_DIALECT || 'mysql',
	db_host: process.env.DB_HOST || 'localhost',
	db_name: process.env.DB_NAME || 'quizpage',
	db_user: process.env.DB_USER || 'huy',
	db_password: process.env.DB_PASSWORD || 'thisispassword',
	app_secret: process.env.SESSION_SECRET || 'secret',
	salt: process.env.SALT || 'secret',
};
