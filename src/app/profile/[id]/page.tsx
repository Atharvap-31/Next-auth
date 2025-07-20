import React from "react";

const UserProfile = async ({ params }: any) => {
  const { id } = await params;
  return (
    <div>
      <h1>User Profile : {id}</h1>
    </div>
  );
};

export default UserProfile;
