import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

export function UserEditCard({ user, setChanged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  async function handleUsername(e) {
    e.preventDefault();
    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (res.ok) {
      console.log("All good");
    } else if (res.status === 409) {
      setAlert("Username already exists");
      setChanged((old) => !old);
    } else {
      console.log("Something went awry");
    }
  }

  async function handlePassword(e) {
    e.preventDefault();
    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      console.log("All good");
      setChanged((old) => !old);
    } else {
      console.log("Something went 2");
    }
  }

  async function handleFullName(e) {
    e.preventDefault();
    const res = await fetch(`/api/users/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ fullName }),
    });
    if (res.ok) {
      console.log("All good");
      setChanged((old) => !old);
      navigate(`../${fullName}`);
    } else {
      console.log("Something went awry");
    }
  }

  async function deleteUser() {
    const res = await fetch(`/api/users/${user.username}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("All good");
      navigate("..");
      setChanged((old) => !old);
    } else {
      console.log("Something went wrong");
    }
  }

  return (
    <div>
      <h1>{user.fullName}</h1>
      <form onSubmit={handleUsername}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user.username}
          />
        </label>
        <button>Change</button>
      </form>
      <form onSubmit={handlePassword}>
        <label>
          Password:&nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"*****"}
          />
        </label>
        <button>Change</button>
      </form>
      <form onSubmit={handleFullName}>
        <label>
          Full name:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={user.fullName}
          />
        </label>
        <button>Change</button>
      </form>
      <button onClick={deleteUser}>Delete user</button>
      {alert}
    </div>
  );
}

export function UserEditor() {
  const [users, setUsers] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      } else {
        console.log("Something went wrong " + res.statusMessage);
      }
    })();
  }, [changed]);

  return (
    <div>
      <h1>Edit users</h1>
      {users.map((u) => (
        <div key={u._id}>
          <Link to={`${u.fullName}`}>{u.fullName}</Link>
        </div>
      ))}
      <Routes>
        {users.map((u) => (
          <Route
            key={u._id}
            path={`/${u.fullName}`}
            element={
              <UserEditCard
                user={u}
                changed={changed}
                setChanged={setChanged}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
}
