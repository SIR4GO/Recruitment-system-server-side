
const Candidate = require('../models/candidate');


class CandidateController {

   static register(req , res)
    {
        const candidate = new Candidate(req.body.name , req.body.email , req.body.password, '') ;
        candidate.save(req , res);
    }

    static login(req , res)
    {
        const candidate = new Candidate() ;
        candidate.setEmail(req.body.email);
        candidate.setPassword(req.body.password);
        candidate.find(req , res);
    }

    static findCandidate(req , res)
    {
        const candidate = new Candidate();
        candidate.setToken(req.body.token);
        candidate.findByToken(req , res)
    }

    static updateCandidateByCv(req , res)
    {
        const candidate = new Candidate();
        candidate.setCv(req.body.cv);
        candidate.setId(req.body.id);
        candidate.updateCandiateByCV(req , res)
    }

    static addApliedCandidate(req , res)
    {
        const candidate = new Candidate();
        candidate.setJobId(req.body.job_id);
        candidate.setId(req.body.candidate_id);
        candidate.addAppliedCandidate(req , res)
    }
}

module.exports = CandidateController;