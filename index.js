require("dotenv").config();
const sqlite3 = require("sqlite3");
const express = require("express");
const session = require("express-session");
const sqliteStoreFactory = require("express-session-sqlite").default;
const passport = require("passport");
const cors = require("cors");
const router = require("./routes/routes");
const path = require("path");
const multer = require("multer");
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("ejs", require("ejs-mate"));
app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
// Переписать и сделать рефакторинг, пока костыльно так
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath = "public/uploads/";
    if (file.fieldname === "videoUrl") {
      destinationPath += "reviews";
    } else if (file.fieldname === "newsImageUrl") {
      destinationPath += "news";
    } else if (file.fieldname === "advantagesImageUrl") {
      destinationPath += "advantages";
    } else if (file.fieldname === "mainVideoUrl" || file.fieldname === "poster") {
      destinationPath += "mainVideo";
    } else if (file.fieldname === "docsBlockFiles") {
      const url = req.originalUrl.split('/')
      destinationPath += `docs/${url[url.length - 1]}`;
      if(!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath);
      }
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
    cb(null, file.originalname);
  },
});
app.use(multer({ storage: storageConfig }).any());

const SqliteStore = sqliteStoreFactory(session);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SqliteStore({
      driver: sqlite3.Database,
      path: "./prisma/dev.db",
      ttl: 60 * 60 * 1000,
      prefix: "sess",
      cleanupInterval: 300000,
    }),
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

require("./config/passport-config");
app.use(passport.initialize());
app.use(passport.session());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const reviews = await prisma.Reviews.findMany();
  const news = await prisma.News.findMany();
  const main = await prisma.Main.findMany();
  const welcome = await prisma.Welcome.findMany();
  const faq = await prisma.FAQ.findMany();
  const advantages = await prisma.Advantages.findMany();
  const performance = await prisma.Performance.findUnique({
    where: {
      id: 1
    }
  });
  const performanceItems = await prisma.PerformanceItems.findMany();
  if (req.user?.email)
    res.render("pages/index.ejs", {
      user: req.user.email,
      reviews: reviews,
      news: news,
      main: main,
      welcome: welcome,
      faq: faq,
      advantages: advantages,
      performance: performance,
      performanceItems: performanceItems,
    });
  else
    res.render("pages/index.ejs", {
      user: "Авторизуйтесь",
      reviews: reviews,
      news: news,
      main: main,
      welcome: welcome,
      faq: faq,
      advantages: advantages,
      performance: performance,
      performanceItems: performanceItems,
    });
});
app.get('/about', async (req, res) => {
  const docsBlock = await prisma.DocsBlock.findMany({
    include: {
      docs: true
    }
  });
  // console.log(docsBlock.docs)
  res.render('pages/about.ejs', {docsBlock: docsBlock})
})
app.use("/", router);

app.use(function (req, res) {
  res.render("pages/404.ejs");
});

app.listen(PORT, () => {
  console.log(`>>> Server started on port: ${PORT}`);
});
