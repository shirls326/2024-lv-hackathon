// React
import React from 'react';
import './messages.css';

// Components
import Navbar from '../../components/Navbar';

function Messages() {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-70px)] bg-base-200">
        {/* Sidebar with conversations */}
        <div className="w-1/3 bg-base-100 p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="space-y-2">
            <div className="card bg-base-100 shadow-md p-2 cursor-pointer hover:bg-base-200 transition">
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placehold.co/100x100" alt="User" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">John Doe</h3>
                  <p className="text-sm text-gray-500">Hey, is the item still available?</p>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md p-2 cursor-pointer hover:bg-base-200 transition">
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placehold.co/100x100" alt="User" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Jane Smith</h3>
                  <p className="text-sm text-gray-500">I’m interested in the chair!</p>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md p-2 cursor-pointer hover:bg-base-200 transition">
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://placehold.co/100x100" alt="User" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Emily Clark</h3>
                  <p className="text-sm text-gray-500">Can you lower the price?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-base-100">
          <div className="flex items-center p-4 border-b border-gray-200 bg-base-100">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://placehold.co/100x100" alt="User" />
              </div>
            </div>
            <h3 className="ml-4 font-bold text-lg">John Doe</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            <div className="chat chat-start">
              <div className="chat-bubble">Hey, is the item still available?</div>
              <span className="chat-footer text-xs text-gray-500">2:45 PM</span>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble bg-primary text-white">Yes, it’s still available!</div>
              <span className="chat-footer text-xs text-gray-500">2:46 PM</span>
            </div>
            <div className="chat chat-start">
              <div className="chat-bubble">Great! Can we meet up tomorrow?</div>
              <span className="chat-footer text-xs text-gray-500">2:47 PM</span>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-base-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered flex-1"
              />
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
