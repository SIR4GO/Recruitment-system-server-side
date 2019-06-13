const Job = require('../models/job');
const hr  = require('../models/hr');

class JobController {

    static add(req , res)
    {

        if(typeof req.body.hr_id === 'number' && req.body.hr_id !== undefined  && req.body.hr_id !== null ){
            const job = new Job(req.body.title , req.body.description , req.body.requirement , req.body.date , req.body.hr_id);
            job.save(req , res);
        }
        else
          res.json({message: 'cant add job'});

    }

    static find(req , res)
    {
        const job = new Job() ;
        job.setId(req.body.id);
        job.setDescription(req.body.description);

        job.findByAttributes(req , res);
    }

    static getAll(req ,res)
    {
        const job = new Job();
        job.findAllJobs(req ,res);
    }
}

module.exports = JobController;