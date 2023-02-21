import { Router } from "express";

export function LoginApi() {
  const router = new Router();

  router.get("/", (req, res) => {
    if (req.user) {
      const { _id, username, fullName, userType, group } = req.user;
      res.json({ _id, username, fullName, userType, group });
    } else {
      res.json({});
    }
  });

  router.post("/", (req, res) => {
    const { username: reqUsername, password } = req.body;
    console.log("post in login");

    const { _id, username, fullName, userType, group } =
      req.users.find(
        (u) => u.username === reqUsername && u.password === password
      ) || {};
    if (_id) {
      res.cookie("username", username, { signed: true });
      res.cookie("userType", userType, { signed: true });
      res.json({ _id, username, fullName, userType, group });
    } else {
      res.sendStatus(401);
    }
  });

  router.delete("/", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("userType");
    res.sendStatus(200);
  });

  return router;
}
