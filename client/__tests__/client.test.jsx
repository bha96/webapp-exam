import * as React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Login } from "../src/login";
import { NotFound } from "../src/notFound";
import { NavBar } from "../src/navBar";
import { App } from "../src/app";
import { Activities, ActivityCard } from "../src/activities";
import { UserEditCard, UserEditor } from "../src/manager/userEditor";
import { TeamChooser, UserCard } from "../src/manager/teamChooser";
import { GroupManager } from "../src/manager/groupManager";
import { CreateUser } from "../src/manager/createUser";
import {
  ActivityEditCard,
  ActivityEditor,
} from "../src/manager/activityEditor";
describe("renders components", function () {
  global.fetch = jest.fn(() => {
    return {
      ok: true,
      json: () => {
        return [
          {
            key: 123,
            name: "Saving the world",
            group: [1, 2],
            hours: [{ hours: 0, username: "clark" }],
          },
        ];
      },
    };
  });

  it("shows login page", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("show not found page", function () {
    const component = renderer.create(<NotFound />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows navigation bar", async function () {
    let component;
    await act(
      async () =>
        (component = renderer
          .create(
            <MemoryRouter>
              <NavBar user={{ userType: "user", username: "test" }} />
            </MemoryRouter>
          )
          .toJSON())
    );
    expect(component).toMatchSnapshot();
  });

  it("shows front page", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows activities", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <Activities />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows activity cards", async function () {
    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return [
            {
              key: 123,
              name: "Saving the world",
              group: [1, 2],
              hours: [{ hours: 0, username: "clark" }],
            },
          ];
        },
      };
    });

    let component;
    await act(
      async () =>
        (component = renderer
          .create(
            <MemoryRouter>
              <ActivityCard
                activity={{
                  name: "Saving the world",
                  group: [1, 2],
                  hours: [{ hours: 0, username: "clark" }],
                }}
              />
            </MemoryRouter>
          )
          .toJSON())
    );

    expect(component).toMatchSnapshot();
  });

  it("shows user editor", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <UserEditor />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
  it("shows user editor card", async function () {
    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return [
            {
              key: 123,
              name: "Saving the world",
              group: [1, 2],
              hours: [{ hours: 0, username: "clark" }],
            },
          ];
        },
      };
    });
    let component;
    await act(
      async () =>
        (component = renderer
          .create(
            <MemoryRouter>
              <UserEditCard
                user={{
                  _id: "63f346e92ff514f3a1d7eaa1",
                  username: "carl",
                  password: "123",
                  fullName: "Carl Sagan",
                  userType: "user",
                  group: 1,
                  totalHours: 0,
                }}
              />
            </MemoryRouter>
          )
          .toJSON())
    );
    expect(component).toMatchSnapshot();
  });
  it("shows user team chooser", function () {
    global.fetch = jest.fn(() => {
      return {
        ok: true,
        json: () => {
          return [
            {
              _id: "63f346e92ff514f3a1d7eaa1",
              username: "carl",
              password: "123",
              fullName: "Carl Sagan",
              userType: "user",
              group: 1,
              totalHours: 0,
            },
            {
              _id: "63f348402ff514f3a1d7eaa3",
              username: "george",
              password: "123",
              fullName: "George Clooney",
              userType: "user",
              group: 2,
              totalHours: 0,
            },
          ];
        },
      };
    });
    const component = renderer
      .create(
        <MemoryRouter>
          <TeamChooser
            user={{
              _id: "63f348402ff514f3a1d7eaa3",
              username: "george",
              password: "123",
              fullName: "George Clooney",
              userType: "user",
              group: 2,
              totalHours: 0,
            }}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows user card", async function () {
    let component;
    await act(
      async () =>
        (component = renderer
          .create(
            <MemoryRouter>
              <UserCard
                user={{
                  _id: "63f346e92ff514f3a1d7eaa1",
                  username: "carl",
                  password: "123",
                  fullName: "Carl Sagan",
                  userType: "user",
                  group: 1,
                  totalHours: 0,
                }}
              />
            </MemoryRouter>
          )
          .toJSON())
    );
    expect(component).toMatchSnapshot();
  });

  it("shows user GroupManager", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <GroupManager />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows user create user page", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows user activity editor", function () {
    const component = renderer
      .create(
        <MemoryRouter>
          <ActivityEditor />
        </MemoryRouter>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("shows user activitiy edit card", async function () {
    let component;
    await act(
      async () =>
        (component = renderer
          .create(
            <MemoryRouter>
              <ActivityEditCard
                activity={{
                  name: "Saving the world",
                  group: [1, 2],
                  hours: [{ hours: 0, username: "clark" }],
                }}
              />
            </MemoryRouter>
          )
          .toJSON())
    );
    expect(component).toMatchSnapshot();
  });
});
