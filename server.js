// the express server

const express = require("express");
const path = require("path");

//SET UP THE DIFFERENT ROUTER FOR DIFFERENT OPERATIONS . ROUTERS ARE LIKE MINI APPLICATION
const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

// TO SET VIEW ENGINE TO DISPLAY THE HTLM REACT JSVASCRIPT PAGES
// PATH MODULE IS REQUIRES TO GET THE ABSOLUTE PATH IN ANY OS
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

//app.use(path, callback)
app.use((req, res, next) => {
  const start = Date.now();
  // console.log(start);
  next();
  const delta = Date.now() - start;
  // console.log(delta);
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use("/site", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "My Friends Are VERYY Clever",
    caption: "Let's go skiing!",
  });
});
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
