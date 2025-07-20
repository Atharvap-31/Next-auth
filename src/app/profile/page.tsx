"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logout Successful");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setId(res.data.data._id);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile Page</h1>

        <h2 className="text-white p-2 bg-black rounded-2xl my-2">
          <Link href={`/profile/${id}`}>{!id ? "No User Found" : id}</Link>
        </h2>
        <button
          type="button"
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
