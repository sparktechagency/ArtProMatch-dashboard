/* eslint-disable react/prop-types */
import { useState } from "react";
import {  FiLogOut } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { FaBook,  FaUser } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  MdDashboard,

  MdPolicy,

} from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");

  const [showSettings, setShowSettings] = useState(false);

  const handleActiveRoute = (item) => {
    setActive(item);
    setShowSettings(false);
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem);
    closeDrawer();
  };

  const toggleDropdown = (item) => {
    setShowSettings(item === "Settings");
  };

  const menuItems = [
    {
      icon: <MdDashboard className="h-5 w-5  text-primary" />,
      label: "dashboard",
      Link: "/",
    },
    {
      icon: <FaBook className="h-5 w-5 text-primary" />,
      label: "Order & Booking",
      isDropdown: true,
      subItems: [
        {
          icon: <BsGraphUp className="h-5 w-5 text-primary" />,
          label: "Scheduled",
          Link: "/scheduled",
      },
        {
          icon: <BsGraphUp className="h-5 w-5 text-primary" />,
          label: "Completed",
          Link: "/completed",
      },
    ]
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5 text-primary" />,
      label: "Payments",
      Link: "/payments",
    },

    {
      icon: <FaUser className="h-5 w-5 text-primary" />,
      label: "User Management",
      isDropdown: true,
      subItems: [
        {
          icon: <FaEdit className="h-5 w-5 text-primary" />,
          label: "User Profile",
          Link: "/user-profile",
        },
        {
          icon: <MdPolicy className="h-5 w-5 text-primary" />,
          label: "Artist Profile",
          Link: "/artist-profile",
        },
        {
          icon: <GrAnalytics className="h-5 w-5 text-primary" />,
          label: "Business Profile",
          Link: "/business-profile",
        },
        
      ],
    },
  ];

  return (
    <div className="">
      <div className=" flex flex-col md:h-full">
        <div className="flex flex-col justify-end items-end gap-2 md:my-5 mb-10">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.Link}
                onClick={!item.isDropdown ? closeDrawer : undefined}
              >
                <div
                  className={`w-52 flex justify-between items-center px-5 py-2 cursor-pointer ${
                    active === item.label
                      ? "rounded-xl bg-primary text-white  hover:text-white"
                      : "bg-white text-primary hover:text-primary border border-primary rounded-xl"
                  }`}
                  onClick={() =>
                    item.isDropdown
                      ? toggleDropdown(item.label)
                      : handleActiveRoute(item.label)
                  }
                >
                  <div
                    className={`${
                      active === item.label
                        ? "text-white hover:text-white"
                        : "bg-white text-black hover:text-black"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {!item.isDropdown ? (
                        <p>{item.label}</p>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <p>{item.label}</p>
                          <BiChevronDown />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* Dropdown for Settings */}
              {item.label === "User Management" && showSettings && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer ${
                          active === subItem.label
                            ? "text-white bg-red-300 font-bold"
                            : "text-black bg-white"
                        }`}
                        onClick={() => handleSubItemClick(subItem.label)}
                      >
                        <p className="flex items-center gap-2 ml-10">
                          {subItem.icon}
                          {subItem.label}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Dropdown for Content */}
              {item.label === "Content" && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer ${
                          active === subItem.label
                            ? "text-white bg-red-700 font-bold"
                            : "text-black bg-white"
                        }`}
                        onClick={() => handleSubItemClick(subItem.label)}
                      >
                        {subItem.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Logout */}
          <Link className="text-black hover:text-black" to="/auth/login">
            <div
              className="bg-red-700 w-52 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-red-500 text-white"
              onClick={() => console.log("Logged out")}
            >
              <FiLogOut className="text-xl" />

              <p className="ml-2">Log out</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
