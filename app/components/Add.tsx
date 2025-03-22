"use client"
import { motion } from "motion/react";
function Add({setIsAdd,isAdd}) {
  return (
    <div>
       {isAdd && (
        <motion.div 
        className="fixed inset-0  flex justify-center items-center"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.5}}
        >
          <div className="bg-black p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold flex justify-center mb-4">Add Item</h2>
            <input type="text" placeholder="Title" className="w-full border p-2 rounded" />
            
            <textarea
              placeholder="Notes"
              className="w-full border p-2 rounded mt-4  h-40"
            />
            <input type="text" placeholder="link" className="w-full border p-2 rounded" />
            
            <div className="flex justify-end mt-4">
              <motion.button onClick={() => setIsAdd(false)}
               className=" text-white px-4 py-2 border rounded"
               whileHover={{scale:1.1}}
               whileTap={{scale:0.9}}
               >
                Cancel
              </motion.button>
              <motion.button 
              className="border text-white px-4 py-2 rounded ml-2"
              
                whileHover={{scale:1.1}}    
                whileTap={{scale:0.9}}

              >Add</motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Add
