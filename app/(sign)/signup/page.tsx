"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
    const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Signup</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
            onClick={async () => {
              try {
                const response = await axios.post("api/routes/", {
                  action: "signup",
                  name: name,
                  password: password,
                });
                router.push("/api/auth/signin");
                console.log(response);
              } catch (error) {
                console.error("Signup failed:", error);
              }
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}