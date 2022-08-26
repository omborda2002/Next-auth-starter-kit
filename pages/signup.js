import React from "react";
import { useSession, signIn } from "next-auth/react";

// API axios
import { axios_post } from "../lib/api/post";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let mobileNumber = e.target.mobileNumber.value;

    if (!username || !password || !mobileNumber) return;

    let res = await axios_post("/api/signup", {
      username: username,
      password: password,
      mobileNumber: mobileNumber
    });
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
      <h1>Signup</h1>
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
          <label htmlFor="mobileNumber">mobile number</label>
          <br />
          <input name="mobileNumber" type="number" />
        </div>
        <div>
          <button type="submit">Signup</button>
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

export default Signup;

export async function getServerSideProps(context) {
  console.log("From Signup");
  return {
    props: {} // will be passed to the page component as props
  };
}
