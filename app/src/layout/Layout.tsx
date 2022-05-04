import { useEffect, useState } from "react";
import {
  UserOutlined,
  ToolOutlined,
  TeamOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import ProLayout from "@ant-design/pro-layout";
import { Link, Redirect, useLocation } from "react-router-dom";

import { useUserSessionStore } from "../libs/session";
import { HeaderRight } from "./HeaderRight";

export function Layout({ children }: any) {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const user = useUserSessionStore((s) => s.user);
  const initUserSession = useUserSessionStore((s) => s.init);

  useEffect(() => {
    (async () => {
      await initUserSession();
      setLoading(false);
    })();
  }, [initUserSession]);

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: "/auth/signin",
          state: { from: location.pathname },
        }}
      />
    );
  }

  const routes = {
    path: "/",
    routes: [
      {
        name: "User Profile",
        icon: <UserOutlined />,
        path: "/user/profile",
      },
      {
        name: "Team Members",
        icon: <TeamOutlined />,
        path: "/team-members",
        hideInMenu: !Object.hasOwn(user.accessTags, "access-team-member"),
      },
      {
        name: "Workspace",
        icon: <AppstoreOutlined />,
        path: "/workspaces",
        hideInMenu: !Object.hasOwn(user.accessTags, "access-workspace"),
      },
      {
        name: "Another Service",
        icon: <ToolOutlined />,
        path: "/public-service",
      },
    ],
  };

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        logo={null}
        title="Web App"
        route={routes}
        menu={{ defaultOpenAll: true }}
        location={{
          pathname: location.pathname,
        }}
        menuItemRender={(item, dom) => <Link to={item.path!}>{dom}</Link>}
        rightContentRender={HeaderRight}
      >
        {children}
      </ProLayout>
    </div>
  );
}
