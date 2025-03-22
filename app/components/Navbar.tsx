"use client"

import { useState } from "react"
import {motion} from "motion/react"
export default function Navbar({setIsAdd, setIsLoggedin ,isLoggedin}) {
    
    
    return(
        <div
         className=" flex justify-between p-4 bg-transparent px-8 "
        style={{zIndex:5, pointerEvents:"auto" ,position:"relative"}}>
            <div className="font-bold">
                MindPalace
            </div>
            <div>
               {isLoggedin ? 
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
                        <motion.button onClick={()=>setIsLoggedin(false)}
                            whileHover={{scale:1.1,color:"" ,backgroundColor:""} }
                            whileTap={{scale:0.9}}
                            transition={{duration:0.1}}
                            className=" text-white rounded-md border px-2"
                            >
                            
                            logout 
                        </motion.button>
                        
                    </div>
                </div> :
                 <div>
                     <motion.button onClick={()=>setIsLoggedin(false)}
                            whileHover={{scale:1.1,color:"" ,backgroundColor:""} }
                            whileTap={{scale:0.9}}
                            transition={{duration:0.1}}
                            className=" text-white rounded-md border px-2"
                            >
                            
                            login
                        </motion.button>
                 </div>}
                
               
                
            </div>
            </div>
    )
}