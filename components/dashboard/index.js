/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
import React from "react";
import Cat from "../../svgs/cat.svg";
import { deleteAllCookies } from "../../common/logout/index";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  console.log(session);

  const logout = async () => {
    await router.push("/login");
    signOut();
    localStorage.clear();
    sessionStorage.clear();
    deleteAllCookies();
  };
  return (
    <div>
      <span> Dashboard page</span>
      <div>
        <Link href="/dashboard/about">About</Link>
      </div>
      <hr />
      <div>
        <button onClick={() => logout()} style={{ cursor: "pointer" }}>
          Logout
        </button>
      </div>
      <hr />
      <div>
        <span>Custom SVG</span>
        <br />
        <Cat />
      </div>
      {session && (
        <>
          <div>
            <span>Google Sign in information</span>
            <br />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              src={session.user.image}
              style={{ width: "50px", height: "50px", borderRadius: "100px" }}
            />
            <p>EMAIL {session.user.email}</p>
            <p>NAME {session.user.name}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
