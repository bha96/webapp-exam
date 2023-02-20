import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.ok) {
      setUser(await res.json());
      console.log(`Hello ${username}`);
      navigate("/activities");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </label>
      </div>
      <button>Log in</button>
    </form>
  );
}
