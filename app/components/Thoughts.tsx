"use client"
import { use, useEffect, useState } from "react";
import {motion} from "motion/react"
import { AnimatePresence } from "motion/react";
function Thoughts() {
    const[thoughts,setThoughts] = useState([{id:1,note:"Chat application with real-time messaging features using WebSockets. Users can create chat rooms, send messages The app supports user authentication and authorization using OAuth 2.0 and JWT tokens.",title:"happy",link:"https://twitter.com/abhisheknaironx/status/1903360154814517490?ref_src=twsrc%5Etfw"}])
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
    <motion.div className="my-40 mx-10 border inline-block p-4 rounded-lg shadow-lg max-w-2xl max-h-2xl"
    whileHover={{scale:1.1}}
    whileTap={{scale:0.9}}
    transition={{duration:0.2}}
    
    >
      {thoughts.map((thought) => (
        <div key={thought.title} className="mb-6 p-4 max-w-2xl" onClick={()=>setSelected(thought)}>
          
          <div className="text-2xl font-bold ">{thought.title}   </div>
            {/* <iframe style={{pointerEvents:"auto"}}
            className="w-full h-full"
             
              src="https://www.youtube.com/embed/cr4wnsLI_Xw?si=m6FS4C9ONrypcP-n" 
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe> */}
           
           <TwitterEmbed twitterUrl={thought.link}/>
          
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
    <motion.div className="w-150  bg-gray-950 p-4 rounded-lg shadow-lg"
  initial={{scale:0.8}}
  animate={{scale:1}}
  exit={{scale:0.8}}
  transition={{duration:0.2}}
  onClick={(e)=>e.stopPropagation()}
  >
   
    <div className="h-full w-full max-w-40 m-0 p-0">
   <TwitterEmbed twitterUrl={thought.link}/>
    </div>
    <div className="font-semibold text-5xl p-4">{thought.title}</div>

    <div className="p-4 px-8 font-normal text-xl">
      {thought.note}
    </div>
  </motion.div></motion.div>
}

function TwitterEmbed({twitterUrl}){
  useEffect(()=>{
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  },[twitterUrl])

  return (
    <blockquote className="twitter-tweet">
      <a href={twitterUrl}></a>
    </blockquote>
  );
}

export default Thoughts
