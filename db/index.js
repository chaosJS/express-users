const mysql = require("mysql");

const db = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'Lichao7712',
	port: '3306',
	database: 'my_jira',
});

module.exports = db;
