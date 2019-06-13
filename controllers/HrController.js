const Hr = require('../models/hr');


class HrController {

    static register(req , res)
    {
        const hr = new Hr(req.body.name , req.body.email , req.body.password) ;
        hr.save(req , res);
    }

    static login(req , res)
    {
        const hr = new Hr() ;
        hr.setEmail(req.body.email);
        hr.setPassword(req.body.password);
        hr.find(req , res);
    }
    static findHr(req , res)
    {
        const hr = new Hr();
        hr.setToken(req.body.token);
        hr.findByToken(req , res)
    }
}

module.exports = HrController;