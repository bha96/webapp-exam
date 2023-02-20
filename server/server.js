import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { LoginApi } from "./loginApi.js";
import { ActivitiesApi } from "./activitiesApi.js";

dotenv.config();

const app = express();
const mongoClient = new MongoClient(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

mongoClient.connect().then(async () => {
  console.log("mongodb started");
});

app.use("/api/login", LoginApi(mongoClient.db("webapp-exam")));

app.use("/api/activities", ActivitiesApi(mongoClient.db("webapp-exam")));

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
