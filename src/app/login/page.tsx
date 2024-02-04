"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [forgetPassword, setForgetPassword] = React.useState(false);
  const [verifyEmail, setVerifyEmail] = React.useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      // console.log("Login json success", response.json());
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      // toast.dismiss()
    }
  };
  function handleForgotPassword() {
    setForgetPassword(!forgetPassword);
    console.log("checkbox clicked");
  }
  async function handleVerifyEmail() {
    console.log("insied verify ", verifyEmail);
    try {
      await axios
        .post("/api/users/forgotpassword", {
          verifyEmail,
        })
        .then((response) => {
          console.log("res is", response.data);
        });

      //   console.log("forgot email data is", response.data);
      //   const { status } = response;
      //   if (status == 200) {
      //     toast.success("email Send");
      //   } else toast.error("unable to send email");
    } catch (error) {
      console.log("error is ", error);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      {forgetPassword ? (
        <div>
          <label htmlFor="email">Verify Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="verifyemail"
            type="email"
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            placeholder="email"
          />
          <button
            onClick={handleVerifyEmail}
            className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Verify Email
          </button>
        </div>
      ) : (
        <>
          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            {!loading ? "Login" : "Logging in...."}{" "}
          </button>
          <div className="flex gap-2 mb-2">
            <input
              type="checkbox"
              checked={forgetPassword}
              onChange={handleForgotPassword}
              id="some_id"
              className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-100 checked:border-0"
            />
            <label htmlFor="some_id">Forgot Password?</label>
            <svg
              className="
      absolute 
      w-4 h-4 mt-1
      hidden peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <Link href="/signup">Visit Signup page</Link>
        </>
      )}
    </div>
  );
}
