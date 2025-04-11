"use client"

import { useState } from "react"
import axios from "axios"

export default function Signup() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    return(
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="name" onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <input type="text" placeholder="password" onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <button onClick={async()=>{
               const response=await axios.post("api/routes/",{
                    action:"signup",
                    name: name,
                    password: password
                })
                console.log(response)
            }}>press</button>
        </div>
    )
  
}