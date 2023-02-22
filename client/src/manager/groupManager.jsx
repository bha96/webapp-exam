import { Link, Route, Routes } from "react-router-dom";
import { TeamChooser } from "./teamChooser";
import { CreateUser } from "./createUser";
import { UserEditor } from "./userEditor";
import { ActivityEditor } from "./activityEditor";
import * as React from "react";

export function GroupManager({ user }) {
  return (
    <div>
      <h1>"Company logo"</h1>
      <Link to={"./team-chooser"}>Team Chooser</Link>
      &nbsp;&nbsp;
      <Link to={"./users/new"}>Create user</Link>
      &nbsp;&nbsp;
      <Link to={"./users/edit"}>Edit users</Link>
      &nbsp;&nbsp;
      <Link to={"./activities/edit"}>Edit activities</Link>
      <Routes>
        <Route path={"/team-chooser"} element={<TeamChooser user={user} />} />
        <Route path={"/users/new"} element={<CreateUser />} />
        <Route path={"/users/edit/*"} element={<UserEditor />} />
        <Route path={"/activities/edit/*"} element={<ActivityEditor />}></Route>
      </Routes>
    </div>
  );
}
