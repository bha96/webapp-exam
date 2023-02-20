import { useEffect, useState } from "react";

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
        <h1 key={a.name}>{a.name}</h1>
      ))}
    </div>
  );
}
