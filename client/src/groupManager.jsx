import { Link, Route, Routes } from "react-router-dom";
import { TeamChooser } from "./teamChooser";
import { CreateUser } from "./createUser";

export function GroupManager({ user }) {
  return (
    <div>
      <Link to={"./team-chooser"}>Team Chooser</Link>
      &nbsp;&nbsp;
      <Link to={"./user/create"}>Create user</Link>
      <Routes>
        <Route path={"/team-chooser"} element={<TeamChooser user={user} />} />
        <Route path={"/user/create"} element={<CreateUser />} />
      </Routes>
    </div>
  );
}
