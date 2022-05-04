import { useUserSessionStore } from "../libs/session";

export default function UserProfilePage() {
  const user = useUserSessionStore((store) => store.user);
  return (
    <div>
      当前用户角色： {user?.role}
      <br />
      <br />
      权限列表：
      {Object.keys(user?.accessTags || {}).map((key) => (
        <div key={key}>
          {key} = {user?.accessTags[key]}
        </div>
      ))}
    </div>
  );
}
