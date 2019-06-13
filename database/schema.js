const connection =  require('./connection');

const connectionInstance = connection.getConnectionInstance();

connectionInstance.connect();


connectionInstance.query('CREATE TABLE IF NOT EXISTS hr (' +
    '    id INT AUTO_INCREMENT PRIMARY KEY,' +
    '    name VARCHAR(255) NOT NULL,' +
    '    email VARCHAR(255) NOT NULL UNIQUE,' +
    '    password VARCHAR(255) NOT NULL' +
    ')' , function (error, results, fields) {
             if (error) throw error;
});


connectionInstance.query('CREATE TABLE IF NOT EXISTS candidate (' +
    '    id INT AUTO_INCREMENT PRIMARY KEY,' +
    '    name VARCHAR(255) NOT NULL,' +
    '    email VARCHAR(255) NOT NULL UNIQUE,' +
    '    password VARCHAR(255) NOT NULL,' +
    '    cv VARCHAR(255) NOT NULL' +
    ')' , function (error, results, fields) {
            if (error) throw error;
});


connectionInstance.query('CREATE TABLE IF NOT EXISTS job (' +
    '    id INT AUTO_INCREMENT PRIMARY KEY,' +
    '    title VARCHAR(255) NOT NULL,' +
    '    description VARCHAR(255) NOT NULL UNIQUE,' +
    '    requirement VARCHAR(255) NOT NULL,' +
    '    date VARCHAR(255) NOT NULL,' +
    '    hr_id INT NULL,' +
    '    FOREIGN KEY (hr_id) REFERENCES hr(id)' +
    ')' , function (error, results, fields) {
              if (error) throw error;
});



connectionInstance.query('CREATE TABLE IF NOT EXISTS candidate_job (' +
    '    id INT AUTO_INCREMENT PRIMARY KEY,' +
    '    candidate_id INT NULL,' +
    '    job_id INT NULL,' +
    '    FOREIGN KEY (candidate_id) REFERENCES candidate(id),' +
    '    FOREIGN KEY (job_id) REFERENCES job(id)' +
    ')' , function (error, results, fields) {
            if (error) throw error;
});






connectionInstance.end();