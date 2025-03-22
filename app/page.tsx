"use client";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Add from "./components/Add";
import Thoughts from "./components/Thoughts";
import { useState } from "react";
export default function Home() {
  const [isAdd, setIsAdd] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(true);
  return (
   <div>
    
    <Navbar setIsAdd={setIsAdd} setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin}  />
    {isAdd ? <Add setIsAdd={setIsAdd}  isAdd={isAdd} /> : null}
    {isLoggedin?<Thoughts/>:<Header/>}
   </div>
  );
}
