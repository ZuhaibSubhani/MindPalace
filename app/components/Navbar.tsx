


import {motion} from "motion/react"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router= useRouter()
    
    return(
        <div
         className=" flex justify-between p-4 bg-transparent px-8 "
        style={{zIndex:5, pointerEvents:"auto" ,position:"relative"}}>
            <div className="font-bold">
                MindPalace
            </div>
            <div>
              
                 <div>
                     <motion.button 
                     onClick={()=>router.push("/api/auth/signin")}
                            whileHover={{scale:1.1,color:"" ,backgroundColor:""} }
                            whileTap={{scale:0.9}}
                            transition={{duration:0.1}}
                            className=" text-white rounded-md border px-2"
                            >
                            
                            login
                        </motion.button>
                 </div>
                
               
                
            </div>
            </div>
    )
}