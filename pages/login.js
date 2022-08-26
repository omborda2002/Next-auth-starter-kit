import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
// API axios
import { axios_post } from "../lib/api/post";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;

    if (!username || !password) return;
    let res = await axios_post("/api/login", { username, password });
    if (res.data.token) {
      localStorage.setItem("Authorization", res.data.token);
      sessionStorage.setItem("Authorization", res.data.token);
      setCookie("Authorization", res.data.token, {
        maxAge: 60 * 60 * 24,
        sameSite: true
      });
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <br />
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <br />
          <input name="password" type="text" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <div>
        <button
          onClick={async () => {
            await signIn();
          }}
          type="button"
          className="login-with-google-btn"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  console.log("From Login");
  return {
    props: {} // will be passed to the page component as props
  };
}
