import { useEffect, useState } from "react";

export function GroupManager(mongoDatabase) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");
      if (res.ok) {
        setUsers(await res.json());
      }
    })();
  }, []);

  return (
    <div>
      {users.map((u) => (
        <div>{u.fullName}</div>
      ))}
    </div>
  );
}
