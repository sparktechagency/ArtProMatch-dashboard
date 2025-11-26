/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import user from '../../../assets/image/user.png';
import { BsFillSendFill } from 'react-icons/bs';
import { useState } from 'react';
import { Drawer } from 'antd';
// import { MdPermMedia } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaX } from 'react-icons/fa6';
import RightSideBar from '../RightSideBar';

const MainChat = () => {
  const [text, setText] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}

      <div className="flex justify-between items-center px-5 py-2 border-b border-neutral-400 h-20">
        <div className="flex items-center gap-2">
          <img src={user} alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-semibold">Talia</h3>
            <p>Don't text</p>
          </div>
        </div>
        <BsThreeDots className=" lg:hidden h-5 w-5" onClick={showDrawer} />
      </div>

      {/* Main Chat and Sidebar Section */}
      <div className="flex flex-1 h-full">
        {/* Chat Area */}
        <div className="w-full lg:w-[70%] border-r border-neutral-400 relative">
          <div
            className="p-5 overflow-y-auto"
            style={{ height: 'calc(100% - 5rem)' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img src={user} alt="User" className="w-8 h-8 rounded-full" />
                <div className="bg-[#eee9e8] px-4 py-2 rounded-r-3xl rounded-t-3xl">
                  <h3 className="text-base">Hello John, how can I help you?</h3>
                </div>
              </div>
              <p className="text-xs pl-10">musa - 9:30</p>
            </div>
            <div className="flex justify-end mt-5">
              <div className="text-right">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-[#eee9e8] px-4 py-2 rounded-l-3xl rounded-t-3xl">
                    <h3 className="text-base">
                      Hello John, how can I help you?
                    </h3>
                  </div>
                  <img
                    src={user}
                    alt="Talia"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                <p className="text-xs pr-10">musa - 9:30</p>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="h-20 w-full bg-white absolute bottom-0 flex items-center px-4">
            <input
              onChange={e => setText(e.target.value)}
              className="border px-4 py-2 rounded-full w-full lg:w-4/5"
              placeholder="Type a message..."
            />
            <BsFillSendFill className="w-5 h-5 text-primaryColor -ml-10 cursor-pointer" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block w-[30%]">
          <RightSideBar />
        </div>
      </div>

      {/* Drawer for Sidebar on Small Screens */}
      <Drawer
        title="Chat Details"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width="80%"
        closeIcon={<FaX className="text-black " />}
      >
        <RightSideBar />
      </Drawer>
    </div>
  );
};

export default MainChat;
