import { Router } from "express";

export function UsersApi(mongoDatabase) {
  const router = Router();

  router.get("/", async (req, res) => {
    console.log(req.user.userType);
    if (req.user.userType === "manager") {
      const users = await mongoDatabase.collection("users").find().toArray();
      res.json(users);
      console.log(users);
    } else {
      res.sendStatus(401);
    }
  });

  return router;
}
