import { Link, Route, Routes } from "react-router-dom";
import { TeamChooser } from "./teamChooser";
import { CreateUser } from "./createUser";
import { EditUsers } from "./editUsers";

export function GroupManager({ user }) {
  return (
    <div>
      <Link to={"./team-chooser"}>Team Chooser</Link>
      &nbsp;&nbsp;
      <Link to={"./users/new"}>Create user</Link>
      &nbsp;&nbsp;
      <Link to={"./users/edit"}>Edit users</Link>
      <Routes>
        <Route path={"/team-chooser"} element={<TeamChooser user={user} />} />
        <Route path={"/users/new"} element={<CreateUser />} />
        <Route path={"/users/edit/*"} element={<EditUsers />} />
      </Routes>
    </div>
  );
}
