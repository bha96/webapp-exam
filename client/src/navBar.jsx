import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

export function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  function logOut() {
    console.log("Logging out");
    fetch("/api/login", {
      method: "DELETE",
    }).then((r) => console.log(r));
    setUser({});
    navigate("/login");
  }

  return (
    <nav className={"navBar"}>
      {user.userType === "manager" && (
        <Link to={"/group-manager"}>Manage your group</Link>
      )}

      {user.userType === "user" && <Link to={"/activities"}>Activities</Link>}
      {user.username && <div>Greetings {user.fullName}!</div>}
      {user.username && (
        <button onClick={logOut} type={"button"}>
          Log out
        </button>
      )}
    </nav>
  );
}
