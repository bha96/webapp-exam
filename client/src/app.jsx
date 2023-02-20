import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "./navBar";

import { Login } from "./login";
import { NotFound } from "./notFound";
import * as React from "react";
import { useEffect, useState } from "react";
import { Activities } from "./activities";

function Home({ user }) {
  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      if (!user.username) {
        navigate("/login");
      }
      if (user.username) {
        navigate("/activities");
      }
    };
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
        {!user.username && (
          <Route path={"/login"} element={<Login setUser={setUser} />}></Route>
        )}
        {user.username && (
          <Route path={"/activities"} element={<Activities />}></Route>
        )}

        <Route path={"/*"} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
