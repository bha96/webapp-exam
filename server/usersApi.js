import { Router } from "express";
import { ObjectId } from "mongodb";

export function UsersApi(mongoDatabase) {
  const router = Router();

  router.get("/", async (req, res) => {
    console.log(req.signedCookies.userType);
    if (req.signedCookies.userType === "manager") {
      const users = await mongoDatabase
        .collection("users")
        .find({ userType: "user" })
        .toArray();
      res.json(users);
      console.log(users);
    } else {
      res.sendStatus(401);
    }
  });

  router.post("/", async (req, res) => {
    if (req.signedCookies.userType === "manager") {
      const updatedUsers = await req.body;
      updatedUsers.forEach((u) =>
        mongoDatabase
          .collection("users")
          .updateOne({ username: u.username }, { $set: { group: u.group } })
      );
      console.log(updatedUsers);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  });

  router.post("/new", async (req, res) => {
    if (req.signedCookies.userType === "manager") {
      const { username, fullName, password } = req.body;
      const userExists = await mongoDatabase
        .collection("users")
        .findOne({ username: username });
      console.log("user " + userExists);
      if (userExists && username !== "") {
        res.sendStatus(409);
      } else {
        mongoDatabase.collection("users").insertOne({
          username,
          fullName,
          password,
          userType: "user",
          group: req.user.group,
          totalHours: 0,
        });
        mongoDatabase.collection("activities").updateMany(
          {},
          {
            $push: {
              hours: {
                username: username,
                hours: 0,
              },
            },
          }
        );
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(401);
    }
  });
  router.put("/:id", async (req, res) => {
    if (req.signedCookies.userType === "manager") {
      const userId = req.params.id;
      const { username, fullName, password } = req.body;
      console.log(username, fullName, password);
      if (username) {
        const userExists = await mongoDatabase
          .collection("users")
          .findOne({ username: username });
        if (userExists) {
          res.sendStatus(409);
        } else {
          mongoDatabase
            .collection("users")
            .updateOne(
              { _id: new ObjectId(userId) },
              { $set: { username: username } }
            );
          res.sendStatus(204);
        }
      } else if (fullName) {
        mongoDatabase
          .collection("users")
          .updateOne(
            { _id: new ObjectId(userId) },
            { $set: { fullName: fullName } }
          );
        res.sendStatus(204);
      } else if (password) {
        mongoDatabase
          .collection("users")
          .updateOne(
            { _id: new ObjectId(userId) },
            { $set: { password: password } }
          );
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(401);
    }
  });
  router.delete("/:username", (req, res) => {
    if (req.signedCookies.userType === "manager") {
      const username = req.params.username;
      mongoDatabase.collection("users").deleteOne({ username: username });
      mongoDatabase
        .collection("activities")
        .updateMany(
          { hours: { $elemMatch: { username: username } } },
          { $pull: { hours: { username: username } } }
        );
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
