// 'use client';
// import { UserButton, CivicAuthProvider } from "@civic/auth-web3/react";
import { getUser } from "@civic/auth-web3/nextjs";
export function TitleBar() {
  return (
    <div>
      <h1>My App</h1>
      {/* <UserButton /> */}
      {getUser.name}
    </div>
  );
};