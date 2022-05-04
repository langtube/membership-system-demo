import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "@ant-design/pro-form/dist/form.css";
import "@ant-design/pro-table/dist/table.css";
import "@ant-design/pro-layout/dist/layout.css";
import "@ant-design/pro-card/dist/card.css";

import { Layout } from "./layout/Layout";
import Signin from "./pages/Signin";
import UserProfilePage from "./pages/UserProfile";
import TeamMembersPage from "./pages/TeamMembers";
import WorkspacesPage from "./pages/Workspaces";

export function Routes() {
  return (
    <BrowserRouter basename="/app">
      <Switch>
        <Route path="/auth/signin">
          <Signin />
        </Route>
        <Layout>
          <Route path="/user/profile">
            <UserProfilePage />
          </Route>
          <Route path="/team-members">
            <TeamMembersPage />
          </Route>
          <Route path="/workspaces">
            <WorkspacesPage />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
