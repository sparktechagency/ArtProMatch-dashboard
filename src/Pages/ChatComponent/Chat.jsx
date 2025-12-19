import { useState } from 'react';
import { ConfigProvider, Drawer } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import MainChat from './MainChat';

const Chat = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <div className="w-full flex flex-col lg:flex-row mb-10 border border-neutral-400">
      {/* Button to open Drawer on small screens */}
      <div className="flex lg:hidden justify-start p-2">
        <FaUsers
          className="text-2xl cursor-pointer h-10 w-10"
          onClick={showDrawer}
        />
      </div>

      {/* Left Sidebar for larger screens */}
      <div className="hidden lg:block w-[30%] border-r border-neutral-400">
        <LeftSidebar />
      </div>

      {/* Drawer for Left Sidebar on small screens */}
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <Drawer
          title="Chat List"
          placement="left"
          onClose={closeDrawer}
          visible={isDrawerVisible}
          width="80%"
          closeIcon={<FaX className="text-black " />}
        >
          <LeftSidebar />
        </Drawer>
      </ConfigProvider>
      {/* Main Chat Area */}
      <div className="w-full lg:w-[70%]">
        <MainChat />
      </div>
    </div>
  );
};

export default Chat;
