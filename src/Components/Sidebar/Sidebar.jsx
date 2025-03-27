/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
// import { BsGraphUp } from "react-icons/bs";
import { FaBook, FaUser } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard, MdPolicy } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { GrAnalytics } from "react-icons/gr";
const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");

  const handleActiveRoute = (item) => {
    setActive(item);
    setOpenDropdown("");
  };

  const handleSubItemClick = (subItem) => {
    setActive(subItem);
    closeDrawer();
  };

  // const toggleDropdown = (item) => {
  //     setActive(item);
  //     setOpenDropdown(openDropdown === item ? "" : item);
  // };
  const toggleDropdown = (label) => {
    // setActive(label);
    setOpenDropdown(openDropdown === label ? "" : label);
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
          // icon: <BsGraphUp className="h-5 w-5 text-primary" />,
          label: "Scheduled",
          Link: "/scheduled",
        },
        {
          // icon: <BsGraphUp className="h-5 w-5 text-primary" />,
          label: "Completed",
          Link: "/completed",
        },
      ],
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
    <div className="bg-white h-full md:ml-16">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className={`w-72 flex justify-between items-center px-5 py-2 cursor-pointer  ${
                  active === item.label
                    ? "bg-black text-primary font-semibold"
                    : "bg-white text-black font-semibold"
                }`}
                onClick={() =>
                  item.isDropdown
                    ? toggleDropdown(item.label)
                    : handleActiveRoute(item.label)
                }
              >
                <Link to={item.Link}>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <p>{item.label}</p>
                    {item.isDropdown && (
                      <BiChevronDown
                        className={`transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </Link>
              </div>
              {/* Dropdown for sub-items */}
              {item.isDropdown && openDropdown === item.label && (
                <div className="flex flex-col">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer  ${
                          active === subItem.label
                            ? "text-white bg-primary font-bold"
                            : "text-black bg-[#efe5c4]"
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
            </div>
          ))}
          {/* Logout */}
          <Link className="text-black hover:text-black" to="/sign-in">
            <div
              className="bg-primary w-72 md:mt-20 py-3 flex justify-center items-center cursor-pointer hover:bg-primary text-white"
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
