const connection = require('../database/connection');
const CryptoJS = require("crypto-js");

class Candidate {

    constructor(name , email , password , cv)
    {
        this.id = null;
        this.name = name;
        this.email =email;
        this.passwprd = password;
        this.cv = cv;
        this.token ='';
        this.job_id=null;
        this.ecncryptionPassword = "candidate#FOOO0@";
        this.connectionInstance = connection.getConnectionInstance();
    }

    setEmail(email) {this.email = email}
    getEmail() {return this.email}
    setPassword(password) {this.passwprd = password}
    getPassword() {return this.passwprd}
    setToken(token) {this.token = token}
    getToken() {return this.token}
    setId(id) {this.id = id}
    getId() {return this.id}
    setCv(cv) {this.cv = cv}
    getCv() {return this.cv}
    setJobId(job_id) {this.job_id = job_id}
    getJobId() {return this.job_id}

    generatEncryptedToken()
    {// Encrypt
         const token = CryptoJS.AES.encrypt(this.email, this.ecncryptionPassword);
         return token.toString();
    }

    decryptToken(token)
    {// Decrypt
        const bytes = CryptoJS.AES.decrypt(token, this.ecncryptionPassword);
        return bytes.toString(CryptoJS.enc.Utf8);

    }

    save(req , res)
    {
        this.connectionInstance.connect();

        const candidate = {name: this.name, email: this.email , password: this.passwprd , cv: this.cv};
        const token = this.generatEncryptedToken();
        const query =  this.connectionInstance.query('INSERT INTO candidate SET ?', candidate , function (error, results, fields) {
            if (error) {
   //             res.status(400);
                res.json({ message: error.sqlMessage });
            }
            else
               res.json({message:'candidate created successfully' , token: token});
        });
    }

    find( req , res )
    {
        const cardinality = [this.email, this.passwprd];
        const token = this.generatEncryptedToken();
        const query = this.connectionInstance.query('SELECT * FROM candidate WHERE (email = ? and password = ?) ', cardinality ,
            function (error, results, fields) {

               if (error) {
                   res.json({ message: error.sqlMessage });
               }
               else if ( results.length !== 0)
                   res.json({message:'found' , token: token});
               else
                   res.json({message:'not found candidate .. please login' });

        });
    }


    findByToken(req,res)
    {
        this.email = this.decryptToken(this.token);
         // console.log(this.email);
        const cardinality = [this.email];
        const query = this.connectionInstance.query('SELECT * FROM candidate WHERE (email = ? ) ', cardinality ,
            function (error, results, fields) {

                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( results.length !== 0)
                    res.json({message:'candidate found ' , candidate: results[0]});
                else
                    res.json({message:'not found candidate ' });
            });
    }

    updateCandiateByCV(req,res)
    {

        const updateInfo = [this.cv ,this.id];
        const query = this.connectionInstance.query('UPDATE candidate SET cv = ? WHERE (id = ? ) ', updateInfo ,
            function (error, results, fields) {

                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( results.changedRows !== 0)
                    res.json({message:'candidate cv updated ' , candidate: results[0]});
                else
                    res.json({message:'not candidate cv updated  ' });
            });
    }

    addAppliedCandidate(req,res)
    {
        this.connectionInstance.connect();

        const applied = {candidate_id: this.id, job_id : this.job_id };
        console.log(applied);
            const query =  this.connectionInstance.query('INSERT INTO candidate_job SET ?', applied , function (error, results, fields) {
            if (error) {
                //             res.status(400);
                res.json({ message: error.sqlMessage });
            }
            else
                res.json({message:'applied created successfully'});
        });
    }



}

module.exports = Candidate;
