import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { LoginForm } from "@ant-design/pro-form";

import { signin } from "../libs/api/auth";

export default function Signin() {
  const history = useHistory();

  const roles = ["free", "basic", "pro"];

  const onSignin = async (role: string) => {
    const result = await signin({ username: role, password: role });
    if (result) {
      history.replace("/user/profile");
    }
  };

  return (
    <div
      style={{
        paddingTop: 100,
        backgroundImage: "url(" + process.env.PUBLIC_URL + "/bg.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: " center 110px",
        backgroundSize: "100%",
        backgroundColor: "#f0f2f5",
        height: "100vh",
      }}
    >
      <LoginForm
        title={process.env.REACT_APP_NAME}
        subTitle="请登录后访问"
        submitter={false}
      >
        {roles.map((role) => (
          <Button
            key={role}
            type="primary"
            block
            size="large"
            style={{ marginBottom: 20 }}
            onClick={() => onSignin(role)}
          >
            登录为 {role.toUpperCase()} 用户
          </Button>
        ))}
      </LoginForm>
    </div>
  );
}
