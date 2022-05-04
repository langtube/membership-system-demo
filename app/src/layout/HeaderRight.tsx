import { Button } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { useUserSessionStore } from "../libs/session";

export function HeaderRight() {
  const history = useHistory();

  const clearSession = useUserSessionStore((s) => s.clear);

  const handleSwitchUser = async () => {
    clearSession();
    history.replace("/");
  };
  return (
    <div style={{ height: "100%", padding: 4 }}>
      <Button
        danger
        type="primary"
        onClick={handleSwitchUser}
        icon={<UserSwitchOutlined />}
      >
        切换用户
      </Button>
    </div>
  );
}
