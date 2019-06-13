const mysql = require('mysql');

class Connection {

    static getConnectionInstance()
    {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database : 'recruitment'
        });
    }

}


module.exports = Connection;