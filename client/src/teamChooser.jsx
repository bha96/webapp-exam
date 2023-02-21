import { useEffect, useState } from "react";

function UserCard({
  btnSign,
  user,
  setUsersInYourGroup,
  setUsersNotInYourGroup,
}) {
  function changeState() {
    if (btnSign === "-") {
      setUsersInYourGroup((old) => old.filter((u) => u._id !== user._id));
      setUsersNotInYourGroup((old) => [...old, user]);
    } else {
      setUsersNotInYourGroup((old) => old.filter((u) => u._id !== user._id));
      setUsersInYourGroup((old) => [...old, user]);
    }
  }

  return (
    <div>
      <div>{user.fullName}</div>
      <button onClick={changeState}>{btnSign}</button>
    </div>
  );
}

export function TeamChooser({ user }) {
  const [usersInYourGroup, setUsersInYourGroup] = useState([]);
  const [usersNotInYourGroup, setUsersNotInYourGroup] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users");
      if (res.ok) {
        const allUsers = await res.json();
        setUsersInYourGroup(
          allUsers.filter(
            (u) => u.group === user.group && u.username !== user.username
          )
        );
        setUsersNotInYourGroup(allUsers.filter((u) => u.group !== user.group));
      } else {
        throw await res.body;
      }
    })();
  }, []);

  async function saveTeam() {
    /*
     * Change peoples group to be yours
     */
    usersInYourGroup.forEach((u) => {
      u.group = user.group;
    });

    /*
     * 'Reset' the group on people you want to remove from your team
     */
    usersNotInYourGroup.forEach((u) => {
      u.group = -1;
    });
    const allUsers = usersNotInYourGroup.concat(usersInYourGroup);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allUsers),
    });
    if (res.status >= 400) {
      throw new Error("Server responds with error!");
    }
  }

  return (
    <div>
      <h2>People on your team</h2>
      {usersInYourGroup.map((u) => (
        <UserCard
          key={u.username}
          user={u}
          btnSign={"-"}
          setUsersNotInYourGroup={setUsersNotInYourGroup}
          setUsersInYourGroup={setUsersInYourGroup}
        />
      ))}
      <hr />
      <h2>People not on your team</h2>
      {usersNotInYourGroup.map((u) => (
        <UserCard
          key={u.username}
          user={u}
          btnSign={"+"}
          setUsersNotInYourGroup={setUsersNotInYourGroup}
          setUsersInYourGroup={setUsersInYourGroup}
        />
      ))}
      <hr />
      <button onClick={saveTeam}>Save</button>
    </div>
  );
}
