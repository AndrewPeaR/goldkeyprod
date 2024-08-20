const Router = require("express").Router;
const router = new Router();

const QuestionsController = require('../controllers/questions-controller')

router.post('/', QuestionsController.createQuestion)

module.exports = router