import { Router } from "express";

export function UsersApi(mongoDatabase) {
  const router = Router();

  router.get("/", async (req, res) => {
    console.log(req.user.userType);
    if (req.user.userType === "manager") {
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
    if (req.user.userType === "manager") {
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

  return router;
}
