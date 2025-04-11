"use client";
import { motion } from "framer-motion"; // Corrected import
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
interface Comp {
  setIsAdd: (value: boolean) => void;
  isAdd: boolean;
}

function Add({ setIsAdd, isAdd }: Comp) {
  const {data: session}=useSession();
  const [videoType, setVideoType] = useState<"youtube" | "twitter">("youtube");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [link, setLink] = useState("");
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsAdd(false);
    }
  };

  const handleAdd = async () => {
    if (!session?.user?.id) {
      console.error("User not authenticated.");
      return;
    }
   
    console.log({
      title,
      notes,
      link,
      videoType,
      
      user: session.user.id,
    });
    await axios.post("api/routes/",{
      action:"addBrain",
      title:title,
      description:notes,
      link:link,
      type:videoType,
      
      user:session.user.id

    })
    setIsAdd(false); // Close the modal after adding
  };

  return (
    <div>
      {isAdd && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleClose}
        >
          {/* Modal Box */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-center mb-4">Add Item</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                placeholder="Enter notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Type
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setVideoType("youtube")}
                  className={`px-4 py-2 rounded ${
                    videoType === "youtube"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  YouTube
                </button>
                <button
                  onClick={() => setVideoType("twitter")}
                  className={`px-4 py-2 rounded ${
                    videoType === "twitter"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Twitter
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Link
              </label>
              <input
                type="text"
                placeholder={`Enter ${videoType} video link`}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <motion.button
                onClick={() => setIsAdd(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleAdd}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Add
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Add;