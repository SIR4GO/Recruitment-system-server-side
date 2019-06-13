const connection = require('../database/connection');
const CryptoJS = require("crypto-js");

class hr {

    constructor( name , email , password )
    {
        this.name = name;
        this.email =email;
        this.passwprd = password;
        this.ecncryptionPassword = "hr#Fdddlo0@";
        this.token ='';
        this.connectionInstance = connection.getConnectionInstance();
    }

    setEmail(email) {this.email = email}
    getEmail() {return this.email}
    setPassword(password) {this.passwprd = password}
    getPassword() {return this.passwprd}
    setToken(token) {this.token = token}
    getToken() {return this.token}


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

        const hr = {name: this.name, email: this.email , password: this.passwprd };
        const token = this.generatEncryptedToken();
        const query =  this.connectionInstance.query('INSERT INTO hr SET ?', hr , function (error, results, fields) {
            if (error) {
                res.json({ message: error.sqlMessage });
            }
            else
                res.json({message:'hr created successfully' , token: token});
        });
    }

    find( req , res )
    {
        const cardinality = [this.email, this.passwprd];
        const token = this.generatEncryptedToken();
        const query = this.connectionInstance.query('SELECT * FROM hr WHERE (email = ? and password = ?) ', cardinality ,
            function (error, results, fields) {

                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( results.length !== 0)
                    res.json({message:'found' , token: token});
                else
                    res.json({message:'not found hr .. please login' });

            });
    }

    findByToken(req,res)
    {
        this.email = this.decryptToken(this.token);
        const cardinality = [this.email];
        const query = this.connectionInstance.query('SELECT * FROM hr WHERE (email = ? ) ', cardinality ,
            function (error, results, fields) {

                if (error) {
                    res.json({ message: error.sqlMessage });
                }
                else if ( results.length !== 0)
                    res.json({message:'hr found ' , hr: results[0]});
                else
                    res.json({message:'not found hr ' });
            });
    }



}

module.exports = hr;
