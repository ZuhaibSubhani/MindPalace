export default function Header() {
    return (
      <div className="fixed inset-0 grid grid-cols-1 md:grid-cols-10 bg-gradient-to-r from-transparent via-fuchsia-500 to-fuchsia-700 h-screen">
        {/* Left Section */}
        <div className="col-span-1 md:col-span-4 my-10 md:my-20 mx-4 md:mx-6 p-4 md:p-6">
          <div className="text-3xl md:text-4xl font-bold text-white">
            MindPalace
          </div>
          <div className="text-lg md:text-xl text-gray-200 mt-4">
            A palace with rooms for your thoughts, store your thoughts in a room
            and access them whenever you want. Use AI to talk to your thoughts.
          </div>
        </div>
  
        {/* Right Section */}
        <div className="hidden md:block col-span-6">
          {/* Add content for larger screens if needed */}
        </div>
      </div>
    );
  }