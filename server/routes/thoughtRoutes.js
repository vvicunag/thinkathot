const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  // PUT AND DELETE
} = require('../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
