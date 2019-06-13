const connection = require('../database/connection');
const CryptoJS = require("crypto-js");


class  Job {

    constructor( title , description , requirement , date , hr_id )
    {
        this.id = null;
        this.title = title;
        this.description =description;
        this.requirement = requirement;
        this.date = date;
        this.hr_id = hr_id;
        this.connectionInstance = connection.getConnectionInstance();
    }

    setId(id = null) {this.id = id}
    getId() {return this.id}
    setDescription(description = '') {this.description = description}
    getDescription() {return this.description}
    setHrID(hr_id = null) {this.hr_id = hr_id}
    getHrID() {return this.hr_id}


    decryptToken(token)
    {// Decrypt
        const bytes = CryptoJS.AES.decrypt(token, this.ecncryptionPassword);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log(plaintext);
    }

    save(req , res)
    {
        this.connectionInstance.connect();

        const job = {title: this.title, description: this.description , requirement: this.requirement , date:this.date , hr_id:this.hr_id };
        const query =  this.connectionInstance.query('INSERT INTO job SET ?', job , function (error, results, fields) {
            if (error) {
                res.json({ message: error.sqlMessage });
            }
            else
                res.json({message:'job created successfully' });
        });
    }

    findByAttributes(req, res)
    {
        const cardinality = [this.id, this.description , this.hr_id];
        const query = this.connectionInstance.query('SELECT * FROM job WHERE (id = ? or description = ? or hr_id = ?) ', cardinality ,
            function (error, jobs, fields) {

                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( jobs.length !== 0)
                    res.json(jobs);
                else
                    res.json({message:'not found job .. please login' });

            });
    }
    findAllJobs(req , res)
    {
        const query = this.connectionInstance.query('SELECT * FROM job ',
            function (error, jobs, fields) {
                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( jobs.length !== 0)
                    res.json(jobs);
                else
                    res.json({message:'not found any Jobs ' });

            });

    }


}


module.exports = Job ;
