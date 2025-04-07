"use client"


import {motion} from "motion/react"
import { useRouter } from "next/navigation"

interface comp{
    setIsAdd:(value:boolean)=>void
}

export default function DashNav({setIsAdd}:comp) {
    const router= useRouter()
    
    return(
        <div
         className=" flex justify-between p-4 bg-transparent px-8 z-5 "
        style={{zIndex:5, pointerEvents:"auto" ,position:"relative"}}>
            <div className="font-bold">
                MindPalace
            </div>
            <div>
               
                <div className="flex space-x-4 text-md">
                    <div>
                        <motion.button 
                        whileHover={{scale:1.1,color:"" ,backgroundColor:""} }
                        whileTap={{scale:0.9}}
                        transition={{duration:0.1}}
                        className=" text-white rounded-md border px-2"
                        onClick={()=>{
                            setIsAdd(true)
                        }}
                        >
                         Add
                       </motion.button>
                    </div>
                    <div >
                        <motion.button onClick={()=>router.push("api/auth/signout")}
                            whileHover={{scale:1.1,color:"" ,backgroundColor:""} }
                            whileTap={{scale:0.9}}
                            transition={{duration:0.1}}
                            className=" text-white rounded-md border px-2"
                            >
                            
                            logout 
                        </motion.button>
                        
                    </div>
                </div>
               
                
            </div>
            </div>
    )
}