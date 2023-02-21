import { Router } from "express";

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
        });
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
