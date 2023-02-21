import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "./navBar";

import { Login } from "./login";
import { NotFound } from "./notFound";
import * as React from "react";
import { useEffect, useState } from "react";
import { Activities } from "./activities";
import { GroupManager } from "./groupManager";

function Home({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    (() => {
      if (!user.username) {
        navigate("/login");
        console.log("going to login");
      }
      if (user.userType === "user") {
        navigate("/activities");
        console.log("going to activities");
      } else if (user.userType === "manager") {
        navigate("/group-manager");
        console.log("going to manager");
      }
    })();
  }, []);
}

export function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/login");

      if (res.ok) {
        setUser(await res.json());
      } else {
        throw await res.json();
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path={"/"} element={<Home user={user} />}></Route>
        <Route
          path={"/login"}
          element={<Login user={user} setUser={setUser} />}
        />

        {!(user.userType === "manager") && (
          <Route path={"/activities"} element={<Activities user={user} />} />
        )}
        {user.userType === "manager" && (
          <Route
            path={"/group-manager/*"}
            element={<GroupManager user={user} />}
          />
        )}

        <Route path={"/*"} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
