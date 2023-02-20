import { Router } from "express";

export function ActivitiesApi(mongoDatabase) {
  const router = new Router();
  let users = [];

  router.use(async (req, res, next) => {
    const { username } = req.signedCookies;
    users = await mongoDatabase.collection("users").find().toArray();
    req.user = users.find((u) => u.username === username);
    next();
  });

  router.get("/", async (req, res) => {
    const user = req.user;
    if (user) {
      const activities = await mongoDatabase
        .collection("activities")
        .find({ group: user.group })
        .toArray();
      res.json(activities);
    }
  });

  return router;
}
