"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const [token, setToken] = useState("");
  // const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/changepassword", {
        token,
        newPassword,
      });
      if (response.data) {
        setNewPassword("");
      }
      const { status } = await response;
      console.log("status is ", status);
      status === 200
        ? toast.success("password change succesfully")
        : toast.error("error changing password");
      // setVerified(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };
  async function handleChangePassword() {
    await verifyUserEmail();
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //   useEffect(() => {
  //     if (token.length > 0) {
  //       verifyUserEmail();
  //     }
  //   }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-4xl">Change Password</h1>
      <label htmlFor="password">Enter New password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="password"
      />
      <button
        onClick={handleChangePassword}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        change password
      </button>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {/* {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )} */}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error:{error}</h2>
        </div>
      )}
    </div>
  );
}
