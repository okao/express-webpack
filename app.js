require("dotenv").config();

const logger = require("morgan");
const express = require("express");
const errorHandler = require("errorhandler");

const port = 3000;
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(errorHandler());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//configure the views directory with ejs files
ejs.config = {
  views: path.join(__dirname, "views"),
  partials: path.join(__dirname, "views/partials"),
  layouts: path.join(__dirname, "views/layouts/layout.ejs"),
};

app.set("views", path.join(__dirname, "views"));
app.set("partials", path.join(__dirname, "views/partials"));
app.set("layout", path.join(__dirname, "views/layouts/layout.ejs"));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next();
});

//=======================All the routes - these can have their own file/folder========================
app.get("/", (req, res) => {
  res.render("pages/home", { title: "Express Tailwind EJS" });
});

//=====================================Undefined routes error handling==================
app.all("*", async (req, res, next) => {
  res.render("pages/Four04");
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Code 500: Something Went Wrong";
  res.status(statusCode).send(err.message);
});

//=======================Connecting to port====================================
app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
