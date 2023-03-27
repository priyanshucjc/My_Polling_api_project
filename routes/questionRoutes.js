
const express = require('express');
const router = express.Router();
const { createQuestion , viewQuestions , deleteQuestion } = require('../controllers/questionController');

router.post("/create", createQuestion);
router.get('/:id', viewQuestions);
router.delete('/:id/delete', deleteQuestion);


module.exports = router