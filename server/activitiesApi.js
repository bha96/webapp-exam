import { Router } from "express";
import { ObjectId } from "mongodb";

export function ActivitiesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    if (req.signedCookies.userType === "user") {
      const user = req.user;

      let activitiesAvailable = await mongoDatabase
        .collection("activities")
        .find({ group: user.group })
        .project({
          hours: { $elemMatch: { username: user.username } },
          name: 1,
        })
        .toArray();

      if (activitiesAvailable.length === 0) {
        res.sendStatus(303);
      } else {
        res.json(activitiesAvailable);
      }
    } else if (req.signedCookies.userType === "manager") {
      const allActivities = await mongoDatabase
        .collection("activities")
        .find()
        .toArray();
      res.json(allActivities);
    } else {
      res.sendStatus(401);
    }
  });

  router.put("/log", async (req, res) => {
    if (
      req.signedCookies.userType === "user" ||
      req.signedCookies.userType === "manager"
    ) {
      const user = await mongoDatabase
        .collection("users")
        .find({ username: req.user.username })
        .project({ totalHours: 1 })
        .toArray();

      const { username, hours, activity } = req.body;

      if (user[0].totalHours + hours <= 40) {
        await mongoDatabase
          .collection("users")
          .updateOne({ username: username }, { $inc: { totalHours: hours } });
        await mongoDatabase.collection("activities").updateOne(
          {
            name: activity,
            "hours.username": username,
          },
          { $inc: { "hours.$.hours": hours } }
        );
        res.sendStatus(204);
      } else {
        res.sendStatus(303);
      }
    } else {
      res.sendStatus(401);
    }
  });
  router.put("/group/:_id", (req, res) => {
    if (req.signedCookies.userType === "manager") {
      const activityId = req.params._id;
      const { group } = req.body;
      mongoDatabase
        .collection("activities")
        .updateOne(
          { _id: new ObjectId(activityId) },
          { $set: { group: group } }
        );
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
