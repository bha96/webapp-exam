import { Link, useNavigate } from "react-router-dom";

export function NavBar({ user, setUser }) {
  const navigate = useNavigate();
  function logOut() {
    console.log("Logging out");
    fetch("/api/login", {
      method: "DELETE",
    }).then((r) => console.log(r));
    setUser({});
    navigate("/");
  }

  return (
    <nav className={"navBar"}>
      {user.username && <Link to={"/activities"}>Activities</Link>}
      {user.username && <Link to={"/profile"}>{user.fullName}</Link>}

      {user.username === "admin" && (
        <Link to={"/group-manager"}>Manage your group</Link>
      )}

      {user.username && (
        <button onClick={logOut} type={"button"}>
          Log out
        </button>
      )}
    </nav>
  );
}
