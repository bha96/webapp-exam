import { Router } from "express";

export function LoginApi(mongoDatabase) {
  const router = new Router();
  let users = [];

  router.use(async (req, res, next) => {
    const { username } = req.signedCookies;
    console.log(req.signedCookies);
    users = await mongoDatabase.collection("users").find().toArray();
    req.user = users.find((u) => u.username === username);
    next();
  });

  router.get("/", (req, res) => {
    if (req.user) {
      const { id, username, fullName, userType, group } = req.user;
      res.json({ id, username, fullName, userType, group });
    } else {
      res.json({});
    }
  });

  router.post("/", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      res.cookie("username", user.username, { signed: true });
      res.json({ username: user.username, fullName: user.fullName });
    } else {
      res.sendStatus(401);
    }
  });

  router.delete("/", (req, res) => {
    res.clearCookie("username");
    res.sendStatus(200);
  });

  return router;
}
