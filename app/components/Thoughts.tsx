"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";

// Main Thoughts Component
function Thoughts() {
  const { data: session, status } = useSession();
  const [thoughts, setThoughts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [thoughtToDelete, setThoughtToDelete] = useState(null);

  // Fetch thoughts from the API
  const fetchThoughts = async (userId) => {
    try {
      const response = await axios.get(`/api/routes?action=getBrain&userId=${userId}`);
      setThoughts(response.data.brains || []);
    } catch (error) {
      console.error("Error fetching thoughts:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchThoughts(session.user.id);
    }
  }, [status, session]);

  const handleDelete = async () => {
    try {
      const response = await axios.post("/api/routes/", {
        action: "deleteBrain",
        id: thoughtToDelete,
      });
  
      if (response.status === 200) {
        setThoughts((prev) => prev.filter((t) => t._id !== thoughtToDelete)); // Remove the deleted thought from the state
        setThoughtToDelete(null); // Close the delete modal
      }
    } catch (err) {
      console.error("Failed to delete thought:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-12">My Thoughts</h1>
      <CardGrid thoughts={thoughts} setSelected={setSelected} setThoughtToDelete={setThoughtToDelete} />
      <AnimatePresence>
        {selected && <CardOpen thought={selected} setSelected={setSelected} />}
      </AnimatePresence>
      <AnimatePresence>
        {thoughtToDelete && (
          <DeleteModal onDelete={handleDelete} onCancel={() => setThoughtToDelete(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Card Grid
function CardGrid({ thoughts, setSelected, setThoughtToDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {thoughts.map((thought) => (
        <motion.div
          key={thought.id}
          className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <button onClick={() => setThoughtToDelete(thought._id)} className="mb-2 float-right">
            <X size={24} />
          </button>
          <div className="text-xl font-bold mb-3 capitalize">{thought.title}</div>
          <div className="mb-4 aspect-video overflow-hidden rounded-md">
            {thought.type === "youtube" ? (
              <YouTubeEmbed youtubeUrl={convertToEmbedUrl(thought.link)} />
            ) : (
              <TwitterEmbed twitterUrl={convertToTwitterEmbedUrl(thought.link)} />
            )}
          </div>
          <p className="text-gray-300">{thought.note}</p>
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            onClick={() => setSelected(thought)}
          >
            View Details
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Modal for viewing details
function CardOpen({ thought, setSelected }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setSelected(null)}
    >
      <motion.div
        className="bg-gray-950 rounded-lg p-8 max-w-3xl w-full shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video mb-4 rounded overflow-hidden">
          {thought.type === "youtube" ? (
            <YouTubeEmbed youtubeUrl={convertToEmbedUrl(thought.link)} />
          ) : (
            <TwitterEmbed twitterUrl={convertToTwitterEmbedUrl(thought.link)} />
          )}
        </div>
        <div className="text-3xl font-semibold mb-2 capitalize">{thought.title}</div>
        <p className="text-gray-300 text-lg">{thought.description}</p>
      </motion.div>
    </motion.div>
  );
}

// YouTube Embed
function YouTubeEmbed({ youtubeUrl }) {
  return (
    <iframe
      className="w-full h-full"
      src={youtubeUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

// Twitter Embed
function TwitterEmbed({ twitterUrl }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [twitterUrl]);

  return (
    <blockquote className="twitter-tweet">
      <a href={twitterUrl}></a>
    </blockquote>
  );
}

function convertToTwitterEmbedUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "x.com") {
      urlObj.hostname = "twitter.com";
    }
    return urlObj.toString();
  } catch (error) {
    console.error("Invalid URL", error);
    return url;
  }
}

function convertToEmbedUrl(url) {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  } catch (error) {
    console.error("Invalid URL", error);
    return url;
  }
}

// Delete Modal Component (now standalone and reusable)
function DeleteModal({ onDelete, onCancel }) {
  console.log("DeleteModal rendered");
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gray-950 rounded-lg p-6 max-w-sm w-full text-center shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Delete Thought</h2>
        <p className="text-gray-300 mb-6">Are you sure you want to delete this thought?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Thoughts;
