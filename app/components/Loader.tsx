"use client";
import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <motion.div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #9911ff, red)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: "0% 0%",
          y:"-100vh",
          
        }}
        initial={{
          backgroundPosition: "200% 0%",
          y:0
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <div>
          LOADING
        </div>
      </motion.div>
    </div>
  );
}
