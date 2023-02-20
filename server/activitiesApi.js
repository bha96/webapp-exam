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
    let activitiesWithHours = [];
    if (user) {
      const hours = await mongoDatabase
        .collection("hours")
        .find({ user: user._id })
        .toArray();
      console.log(hours);
      hours.forEach((i) => {
        activitiesWithHours.push({
          name: i.activity,
          hours: i.hours,
        });
      });
      res.json(activitiesWithHours);
    }
  });

  return router;
}
