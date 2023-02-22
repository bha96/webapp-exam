import * as React from "react";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

export function ActivityEditCard({ activity }) {
  const [name, setName] = useState("");
  let [group, setGroup] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    (() => {
      console.log("haha");
      setGroup(activity.group);
    })();
  }, [activity]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function removeGroup(groupMember) {
    setGroup(group.filter((item) => item !== groupMember));
    const res = await fetch(`/api/activities/group/${activity._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ group }),
    });
    if (res.ok) {
      console.log("all good in the hood");
    } else {
      setAlert("Something went wrong");
    }
  }
  return (
    <div>
      <h1>{activity.name}</h1>
      <h4>Groups:</h4>
      <ul>
        {group.map((g) => (
          <li key={g}>
            {g} &nbsp;
            <button onClick={() => removeGroup(g)}>Remove</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Rename activity:
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button>Rename</button>
        <p>{alert}</p>
      </form>
    </div>
  );
}

export function ActivityEditor() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/activities");
      if (res.ok) {
        setActivities(await res.json());
      } else {
        console.log("Something went wrong " + res.statusMessage);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Activity editor</h1>
      {activities.map((a) => (
        <div key={a._id}>
          <Link to={`${a.name}`}>{a.name}</Link>
        </div>
      ))}
      <Routes>
        {activities.map((a) => (
          <Route
            key={a._id}
            path={`/${a.name}`}
            element={<ActivityEditCard activity={a} />}
          />
        ))}
      </Routes>
    </div>
  );
}
