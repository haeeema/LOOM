import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));
// This line is what exposes the public folder to users.
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
// ⭐️Catchall URL

const hadleListen = () =>
  console.log(`✅ Listening on http://localhost:4500 🔥`);
app.listen(4500, hadleListen);
