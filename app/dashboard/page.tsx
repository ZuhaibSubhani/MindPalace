// app/dashboard/page.tsx
"use client"
import { useState } from "react";
import DashNav from "../components/DashNav";
import Add from "../components/Add";
import Thoughts from "../components/Thoughts";
export default function Dashboard() {
    const [isAdd, setIsAdd]=useState(false);
    return (
      <div>
        <DashNav setIsAdd={setIsAdd}></DashNav>
        {isAdd && <Add setIsAdd={setIsAdd} isAdd={isAdd} ></Add>}
        <Thoughts></Thoughts>
      </div>
    );
  }
  