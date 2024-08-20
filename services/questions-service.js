const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


class QuestionsService {
    async createQuestion(questionsInfo){
        const newQuestion = await prisma.Questions.create({
            data: {        
                name: questionsInfo.name,
                phoneNumber: questionsInfo.phoneNumber,
                question: questionsInfo.personQuestion,
            }
        })
        return newQuestion
    }
    async getOneQuestions(questionsId){
        const question = await prisma.Questions.findUnique({
            where: {
                id: questionsId
            }
        })
        return question
    }
    async getAllQuestions(){
        const questions = await prisma.Questions.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        return questions
    }
}

module.exports = new QuestionsService()