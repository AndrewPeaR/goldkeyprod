const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AdminService = require("../services/admin-service");
const questionsService = require("../services/questions-service");

class AdminController {
  async getAllQuestions(req, res) {
    const questions = await questionsService.getAllQuestions();
    res.render("pages/questions.ejs", { questions: questions, user: req.user });
  }
  async createReviews(req, res) {
    // console.log(req.file)
    const newReview = await prisma.reviews.create({
      data: {
        name: req.body.name,
        parent: req.body.parent,
        childAge: req.body.childAge,
        review: req.body.review,
        videoUrl: `${req.files[0].filename}`,
      },
    });
    res.redirect(`update/${newReview.id}`);
  }
  async updateReview(req, res) {
    if (req.files[0]) {
      const newReview = await prisma.reviews.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: req.body.name,
          parent: req.body.parent,
          childAge: req.body.childAge,
          review: req.body.review,
          videoUrl: `${req.files[0].filename}`,
        },
      });
      res.redirect(`${newReview.id}`);
    } else {
      const newReview = await prisma.reviews.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: req.body.name,
          parent: req.body.parent,
          childAge: req.body.childAge,
          review: req.body.review,
        },
      });
      res.redirect(`${newReview.id}`);
    }
  }
}

module.exports = new AdminController();
