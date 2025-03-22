"use client"
import { useState } from "react";
import {motion} from "motion/react"
import { AnimatePresence } from "motion/react";
function Thoughts() {
    const[thoughts,setThoughts] = useState([{id:1,note:"I am happy",title:"happy",link:"https://www.youtube.com/watch?v=cr4wnsLI_Xw"}])
    const [selected, setSelected] = useState(null);
  return (
    <div style={{zIndex:10 ,position:"relative"}}>
     <Card thoughts={thoughts} setSelected={setSelected}/>
     <AnimatePresence>
     {selected&&<CardOpen thought={selected} setSelected={setSelected}/>}
     </AnimatePresence>
    </div>
  )
}


function Card({ thoughts , setSelected}) {
  return (
    <motion.div className="my-40 mx-10 border inline-block p-4 rounded-lg shadow-lg"
    whileHover={{scale:1.1}}
    whileTap={{scale:0.9}}
    transition={{duration:0.2}}
    
    >
      {thoughts.map((thought) => (
        <div key={thought.title} className="mb-6 p-4" onClick={()=>setSelected(thought)}>
          
          <div className="text-2xl font-bold ">{thought.title}   </div>
            <iframe style={{pointerEvents:"auto"}}
            className="w-full h-full"
             
              src="https://www.youtube.com/embed/cr4wnsLI_Xw?si=m6FS4C9ONrypcP-n" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          
        </div>
      ))}
    </motion.div>
  );
}
function CardOpen({thought,setSelected}){
  return  <motion.div
  className="fixed inset-0 flex justify-center items-center backdrop-blur-sm"
  initial={{opacity:0}}
  animate={{opacity:1}}
  style={{backgroundColor:"rgba(0,0,0,0.5)"}}
  transition={{duration:0.5}}
  onClick={()=>setSelected(null)}
  >
    <motion.div className="w-150  bg-red-500 "
  initial={{scale:0.8}}
  animate={{scale:1}}
  exit={{scale:0.8}}

  
  transition={{duration:0.2}}>
    <button onClick={()=>setSelected(null)}>close</button>
    <div className="font-bold text-4xl p-4">{thought.title}</div>
    <div className="h-full w-full">
            <iframe style={{pointerEvents:"auto"}}
            className="w-full h-full"
             
              src="https://www.youtube.com/embed/cr4wnsLI_Xw?si=m6FS4C9ONrypcP-n" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
    </div>
    <div className="p-4 font-normal text-xl">
      {thought.note}
    </div>
  </motion.div></motion.div>
}



export default Thoughts
