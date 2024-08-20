const questionsService = require('../services/questions-service')

class QuestionsController {
    async createQuestion(req, res, next) {
        try {
            const newQuestion = await questionsService.createQuestion(req.body)
            res.redirect('/')
        } catch(err) {
            next(err)
        }
    }
}

module.exports = new QuestionsController()