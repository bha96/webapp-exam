import { useEffect, useState } from "react";

function ActivityCard({ activity }) {
  return (
    <div>
      <div>{activity.name}</div>
      <div>{activity.hours}</div>
    </div>
  );
}

export function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/activities");

      if (res.ok) {
        setActivities(await res.json());
      } else {
        throw await res.body;
      }
    })();
  }, []);

  return (
    <div>
      {activities.map((a) => (
        <ActivityCard key={a.name} activity={a} />
      ))}
    </div>
  );
}
