const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const UserAuth = require("../models/user");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.URI);
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
}

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));



app.route("/").get(async (req, res) => {
    try {
        const tasks = await UserAuth.find({})
        res.render("login.ejs", { todoTasks: tasks });
    }
    catch (err) {
        console.error(err);
    }
}).post(async (req, res) => {
    const todoTask = new UserAuth({
        title: req.body.title
    });
    try {
        await todoTask.save();
        res.redirect("./views/success.ejs");
    } catch (err) {
        res.send(500, err);
    }
});

/* app.get("/", async (req, res) => {
  try {
    const tasks = await TodoTask.find({})
    res.render("todo.ejs", { todoTasks: tasks });
  }
  catch (err) {
    console.error(err);
  }
});

app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title
    });
    try {
      await todoTask.save();
      res.redirect("/");
    } catch (err) {
      res.send(500, err);
    }
});
*/

