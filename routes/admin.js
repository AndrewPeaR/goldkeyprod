const Router = require("express").Router;
const router = new Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const AdminController = require("../controllers/admin-controller");

router.get("/", async (req, res) => {
  if (req.user?.email) {
    const countQuestions = await prisma.Questions.findMany();
    res.render("pages/admin.ejs", {
      user: req.user,
      countQuestions: countQuestions,
    });
  } else {
    res.render("pages/admin.ejs", { user: "" });
  }
});

router.get("/reviews", async (req, res) => {
  const reviews = await prisma.Reviews.findMany();
  res.render("pages/reviews.ejs", { reviews: reviews, user: req.user });
});
router.get("/reviews/create", (req, res) => {
  res.render("pages/createReview.ejs", { review: {}, user: req.user });
});
router.post("/reviews/create", AdminController.createReviews);
router.post("/reviews/update/:id", AdminController.updateReview);
router.get("/reviews/update/:id", async (req, res) => {
  const review = await prisma.Reviews.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.render("pages/updateReview.ejs", { review: review, user: req.user });
});
router.get("/reviews/delete/:id", async (req, res) => {
  const review = await prisma.Reviews.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.redirect("/admin/reviews");
});

router.get("/questions", AdminController.getAllQuestions);
router.get("/questions/apply/:id", async (req, res) => {
  if (req.user?.email) {
    const question = await prisma.Questions.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    const countQuestions = await prisma.Questions.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: !question.status,
      },
    });
    res.redirect("/admin/questions");
  } else {
    res.redirect("/admin/questions");
  }
});
router.get("/questions/delete/:id", async (req, res) => {
  if (req.user?.email) {
    const countQuestions = await prisma.Questions.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.redirect("/admin/questions");
  } else {
    res.redirect("/admin/questions");
  }
});

router.get("/docs", async (req, res) => {
  const docs = await prisma.Docs.findMany();
  res.render("pages/docs.ejs", { user: req.user, docs: docs });
});
router.get("/docs/update/:id", async (req, res) => {
  const doc = await prisma.Docs.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.render("pages/updateDoc.ejs", { user: req.user, doc: doc });
});
router.post("/docs/update/:id", async (req, res) => {
  const doc = await prisma.Docs.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: req.name,
      fileUrl: `${req.file.filename}`,
    },
  });
  res.render("pages/docs.ejs", { user: req.user, doc: doc });
});

router.get("/news", async (req, res) => {
  const news = await prisma.News.findMany();
  res.render("pages/news.ejs", { news: news, user: req.user });
});
router.get("/news/create", (req, res) => {
  res.render("pages/createNews.ejs", { user: req.user });
});
router.post("/news/create", async (req, res) => {
  const newNews = await prisma.News.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      imageUrl: `${req.files[0].filename}`,
    },
  });
  res.redirect("/admin/news/");
});
router.post("/news/update", async (req, res) => {
  // console.log(Number(req.query.id))
  if(req.files[0]){
      const news = await prisma.News.update({
          where: {
              id: Number(req.query.id),
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: `${req.files[0].filename}`,
            },
        });
        res.render("pages/updateNews.ejs", { news: news, user: req.user });
    } else {
        const news = await prisma.News.update({
            where: {
                id: Number(req.query.id),
              },
              data: {
                  title: req.body.title,
                  description: req.body.description
              },
          });
          res.render("pages/updateNews.ejs", { news: news, user: req.user });
    }
});
router.get("/news/update", async (req, res) => {
  try {
    const news = await prisma.News.findUnique({
      where: {
        id: Number(req.query.id),
      },
    });
    res.render("pages/updateNews.ejs", { news: news, user: req.user });
  } catch (e) {
    console.log(e);
    res.render("pages/updateNews.ejs", { news: [], user: req.user });
  }
});
router.get("/news/delete/:id", async (req, res) => {
  const news = await prisma.News.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.redirect("/admin/news");
});

router.get('/main', async (req, res) => {
  const main = await prisma.Main.findUnique({
    where: {
      id: 1
    }
  });
  res.render("pages/main.ejs", { main: main, user: req.user });
})
router.post('/main', async (req, res) => {
  const main = await prisma.Main.update({
    where: {
      id: 1
    },
    data: {
      title: req.body.title,
      undertitle: req.body.undertitle,
      description: req.body.description,
    }
  });
  res.render("pages/main.ejs", { main: main, user: req.user });
})

router.get('/welcome', async (req, res) => {
  const welcome = await prisma.Welcome.findUnique({
    where: {
      id: 1
    }
  });
  res.render("pages/welcome.ejs", { welcome: welcome, user: req.user });
})
router.post('/welcome', async (req, res) => {
  const welcome = await prisma.Welcome.update({
    where: {
      id: 1
    },
    data: {
      title: req.body.title,
      undertitle: req.body.undertitle,
      description: req.body.description,
      callToAction: req.body.callToAction,
      nameOfCEO: req.body.nameOfCEO,
      CEO: req.body.CEO
    }
  });
  res.render("pages/welcome.ejs", { welcome: welcome, user: req.user });
})

module.exports = router;
