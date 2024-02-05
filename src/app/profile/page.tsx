"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  type IUser = {
    [key: string]: any;
  };
  const [user, setUser] = useState<IUser>({});
  const logout = async () => {
    try {
      const { status } = await axios.get("/api/users/logout");
      console.log("logout status is", status);
      if (status === 200) {
        toast.success("Logout successful");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/profile");
    console.log(res.data.user);
    setUser(res.data.user);
  };
  useEffect(() => {
    getUserDetails();

    return () => {
      // second
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="p-1 rounded bg-green-500">
        {!user ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${user?._id}`}>{user?.username}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        GetUser Details
      </button>
    </div>
  );
}
