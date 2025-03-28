/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import brandlogo from "../../assets/image/logo.png";
import user from "../../assets/image/user.png";

const MainLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleDrawer = () => setDrawer(!drawer);
  const closeDrawer = () => setDrawer(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) closeDrawer();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              // paddingXS: 30,
            },
          },
        }}
      >
        <div className="w-full flex">
          {/* Sidebar for Mobile */}
          {isMobile ? (
            <Drawer
              title="Menu"
              placement="left"
              closable={true}
              onClose={closeDrawer}
              open={drawer}
              width="80%"
              closeIcon={<FaX className="text-black" />}
            >
              <Sidebar onClose={closeDrawer} />
            </Drawer>
          ) : (
            <div className="pt-5 px-4 bg-white w-[300px] h-screen">
              <div className="h-14 text-primary flex flex-col items-center justify-center">
                <img src={brandlogo} alt="brandlogo" className="h-12 w-12 " />
                <h1 className="text-2xl font-bold">Steady Hands</h1>
              </div>
              <Sidebar />
            </div>
          )}

          <div className={` flex-1 bg-[#f3f4f6] ${isMobile ? "p-4 " : "p-0"}`}>
            <div className="bg-[#f3f4f6] h-16">
              <div className="h-20 flex justify-between items-center px-2 gap-2">
                {isMobile && (
                  <div className="flex justify-between items-center w-full">
                    {/* Hamburger Menu */}
                    <GiHamburgerMenu
                      onClick={toggleDrawer}
                      className="h-5 w-5 cursor-pointer text-white"
                    />
                    {/* Logo */}
                    <img src={brandlogo} alt="brandlogo" className="h-6 w-6" />
                    {/* Notifications Icon */}
                    <Link to="/notification">
                      <div className="relative">
                        <IoIosNotificationsOutline className="h-10 w-10 bg-white rounded-full text-black p-2" />
                        <span className="bg-green-500 h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
                          1
                        </span>
                      </div>
                    </Link>
                    {/* User Profile Icon */}
                    <Link to="/admin-profile">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={user}
                          alt="User"
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                    </Link>
                  </div>
                )}

                {/* Desktop Layout */}
                {!isMobile && (
                  <div className="w-full flex justify-between items-center  ">
                    <Link to="/admin-profile">
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src={user}
                          alt="User"
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          {" "}
                          <p className="text-sm text-primary">Welcome</p>
                          <h1 className="text-lg font-bold">Mr Robert</h1>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <div className="flex justify-between items-center gap-5 py-5">
                        <Link to="/notification">
                          <div className="relative">
                            <IoIosNotificationsOutline className="h-10 w-10 bg-white rounded-full text-black p-2" />
                            <span className="bg-red-500 h-5 w-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs">
                              1
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-5">
              <Outlet />
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
