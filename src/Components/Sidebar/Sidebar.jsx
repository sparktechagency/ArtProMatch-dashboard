/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
// import { BsGraphUp } from "react-icons/bs";
import { FaBook, FaUser} from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdDashboard, MdReport } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { FaRegMessage } from "react-icons/fa6";
import { TbSquareKey } from "react-icons/tb";

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
      icon: <IoMdImages className="h-5 w-5 text-primary" />,
      label: "Review Images",
      Link: "/review-images",
    },
    {
      icon: <FaRegMessage className="h-5 w-5 text-primary" />,
      label: "Review Messages",
      Link: "/review-messages",
    },
    {
      icon: <TbSquareKey className="h-5 w-5 text-primary" />,
      label: "Keyword Management",
      Link: "/keyword-management",
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
          // icon: <FaEdit className="h-5 w-5 text-primary" />,
          label: "User Profile",
          Link: "/user-profile",
        },
        {
          // icon: <MdPolicy className="h-5 w-5 text-primary" />,
          label: "Artist Profile",
          Link: "/artist-profile",
        },
        {
          // icon: <GrAnalytics className="h-5 w-5 text-primary" />,
          label: "Business Profile",
          Link: "/business-profile",
        },
      ],
    },
    {
      icon: <MdReport className="h-5 w-5 text-primary" />,
      label: "Report",
      Link: "/report",
    },
  ];

  return (
    <div className="bg-white h-full">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className={`w-64 flex justify-between items-center px-5 py-2 cursor-pointer  ${
                  active === item.label
                    ? "bg-primary border rounded-xl text-white font-semibold"
                    : "bg-white text-black font-semibold border-primary border rounded-xl"
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
                <div className="flex flex-col justify-centers items-center">
                  {item.subItems.map((subItem) => (
                    <Link to={subItem.Link} key={subItem.label}>
                      <div
                        className={`py-2 px-5 cursor-pointer w-56 mt-2  ${
                          active === subItem.label
                            ? "text-white bg-primary font-bold border-primary border rounded-xl"
                            : "text-black border-primary border rounded-xl"
                        }`}
                        onClick={() => handleSubItemClick(subItem.label)}
                      >
                        <p className="flex items-center gap-2 ml-2">
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
          <Link className="text-[#d3cccd] hover:text-[#d3cccd]" to="/sign-in">
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
