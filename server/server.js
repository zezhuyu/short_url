import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import hash from "object-hash";
import config from "./config.json" assert {type: "json"};
import clientApi from "./routers/post.js";
//import admin from "./routers/admin";

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true }, () => {
  console.log("MongoDB connected!");
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected!");
});
const app = express(); 
const port = config.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  const redirectHtml = `<script>location.href = "${config.CLINNT_URL}";</script>`;
  res.end(redirectHtml);
});

app.use("/api", clientApi);
//app.use("/admin", admin);

app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});