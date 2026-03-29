import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes } from "react-icons/fa";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔵 Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg"
      >
        <FaRobot size={22} />
      </motion.button>

      {/* 🔥 AI Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Mobile-like Chat Panel */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 right-6 z-50 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >

              {/* Header */}
              <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold">AI Assistant</h3>
                <button onClick={() => setOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                
                {/* Bot Message */}
                <div className="bg-white p-3 rounded-lg shadow text-sm w-fit max-w-[80%]">
                  👋 Hi! How can I help you today?
                </div>

                {/* User Message */}
                <div className="ml-auto bg-purple-600 text-white p-3 rounded-lg text-sm w-fit max-w-[80%]">
                  Show me jobs
                </div>

              </div>

              {/* Input */}
              <div className="p-3 border-t flex gap-2">
                <input
                  type="text"
                  placeholder="Ask something..."
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-purple-600 text-white px-4 rounded-lg text-sm">
                  Send
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}