
const express = require('express');
const router = express.Router();

const {createOption , optionDelete , addVote} = require('../controllers/optionContoller');

router.post('/:id/create', createOption); //here id is the object id of the question
router.delete('/:id/delete', optionDelete);
router.get('/:id/add_vote', addVote);

module.exports = router;