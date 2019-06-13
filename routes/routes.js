const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/CandidateController');
const HrController = require('../controllers/HrController');
const JobController = require('../controllers/JobController');

// cnadidate routes
router.post('/register-candidate', function(req, res) {
    CandidateController.register(req , res);
});

router.post('/login-candidate', function(req, res) {
    CandidateController.login(req , res);
});


router.post('/get-candidate', function(req, res) {
    CandidateController.findCandidate(req,res);
});

router.post('/update-candidate', function(req, res) {
    CandidateController.updateCandidateByCv(req,res);
});

router.post('/add-applied', function(req, res) {
    CandidateController.addApliedCandidate(req,res);
});

// hr routes
router.post('/register-hr', function(req, res) {
   HrController.register(req , res);
});

router.post('/login-hr', function(req, res) {
    HrController.login(req , res);
});

router.post('/get-hr', function(req, res) {
    HrController.findHr(req,res);
});

// job routes

router.post('/add-job', function(req, res) {
    JobController.add(req , res);
});

router.post('/get-job', function(req, res) {
    JobController.find(req , res);
});

router.post('/get-jobs', function(req, res) {
    JobController.getAll(req , res);
});



module.exports = router;
