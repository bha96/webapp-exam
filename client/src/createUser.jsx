import { useState } from "react";

export function CreateUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [alert, setAlert] = useState("");
  const [color, setColor] = useState("black");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, fullName, password);

    const res = await fetch("/api/users/new", {
      method: "POST",
      body: JSON.stringify({ username, password, fullName }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      setColor("green");
      setAlert("User created");
    } else if (res.status === 409) {
      setColor("red");
      setAlert("User already exists");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a new user</h1>
        <p>Everything is case sensitive</p>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"Squirrel Man"}
              required={true}
            />
          </label>
        </div>
        <div>
          <label>
            Full name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={"T.R. Squirrlington"}
              required={true}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"******"}
              required={true}
            />
          </label>
        </div>

        <div>User will automatically be assigned to your group</div>
        <button>Create user</button>
      </form>
      <div style={{ color: color }}>{alert}</div>
    </div>
  );
}
