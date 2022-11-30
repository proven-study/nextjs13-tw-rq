import * as React from "react";
import { useUserQuery } from "@/hooks/useUsers";
import UserAddress from "./UserAddress";
import UserNameForm from "./UserNameForm";
import UserName from "./UserName";

const UserInfo = () => {
  const [showUserAddress, setShowUserAdress] = React.useState(false);
  const { isLoading, isError } = useUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occured.</div>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <UserName />
      {showUserAddress && <UserAddress />}
      <button onClick={() => setShowUserAdress(!showUserAddress)}>
        {showUserAddress ? "Hide Address" : "Show Address"}
      </button>

      <UserNameForm />
    </div>
  );
};

export default UserInfo;
