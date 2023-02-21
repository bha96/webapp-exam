import { useEffect, useState } from "react";

function ActivityCard({ activity, setAlert, setChanged, changed }) {
  const [hours, setHours] = useState(0);
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/activities/log", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        hours: hours,
        activity: activity.name,
        username: activity.hours[0].username,
      }),
    });

    if (res.ok) {
      setAlert(`Added ${hours} to ${activity.name}`);
      setChanged(!changed);
    } else if (res.status === 303) {
      setAlert("You can't go past 40 combined hours");
    } else {
      setAlert("Something went wrong: " + res.statusMessage);
    }
    setHours(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{activity.name}</div>
      <div>Hours: {activity.hours[0].hours}</div>
      <label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.valueAsNumber)}
          min={0}
        />
      </label>
      <button>Log hours</button>
    </form>
  );
}

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [alert, setAlert] = useState("");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/activities");

      if (res.ok) {
        setActivities(await res.json());
      } else if (res.status === 303) {
        setAlert(
          "You currently don't have any tasks, please contact your manager"
        );
      }
    })();
  }, [changed]);

  return (
    <div>
      <hr />
      {activities.map((a) => (
        <ActivityCard
          key={a.name}
          activity={a}
          setAlert={setAlert}
          setChanged={setChanged}
          changed={changed}
        />
      ))}
      <div>{alert}</div>
    </div>
  );
}
