/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard,
  MdMonetizationOn,
  MdPrivacyTip,
  // MdReport
} from 'react-icons/md';
import { FaMoneyCheckAlt } from 'react-icons/fa';
// import { IoMdImages } from 'react-icons/io';
import {
  FaComputerMouse,
  FaRegMessage,
  FaUsersLine,
  // FaUser,
} from 'react-icons/fa6';
// import { TbSquareKey } from 'react-icons/tb';
import { logout, selectUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { FcAbout, FcBusiness } from 'react-icons/fc';
import { HiReceiptRefund } from 'react-icons/hi';
import { RiServiceLine } from 'react-icons/ri';

const Sidebar = ({ onClose }) => {
  const [openDropdown, setOpenDropdown] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      {
        key: 'dashboard',
        icon: <MdDashboard className="h-5 w-5" />,
        label: 'Dashboard',
        path: '/',
      },
      {
        key: 'clients',
        icon: <FaUsersLine className="h-5 w-5" />,
        label: 'Clients',
        path: '/clients',
      },
      {
        key: 'artists',
        icon: <MdMonetizationOn className="h-5 w-5" />,
        label: 'Artists',
        path: '/artists',
      },
      {
        key: 'businesses',
        icon: <FcBusiness className="h-5 w-5" />,
        label: 'Businesses',
        path: '/businesses',
      },
      {
        key: 'services',
        icon: <RiServiceLine className="h-5 w-5" />,
        label: 'Services',
        path: '/services',
      },
      {
        key: 'bookings',
        icon: <FaBook className="h-5 w-5" />,
        label: 'Bookings',
        path: '/bookings',
      },
      {
        key: 'payments',
        icon: <FaMoneyCheckAlt className="h-5 w-5" />,
        label: 'Payments',
        path: '/payments',
      },
      // {
      //   key: 'review-images',
      //   icon: <IoMdImages className="h-5 w-5" />,
      //   label: 'Review Images',
      //   path: '/review-images',
      // },
      {
        key: 'review-messages',
        icon: <FaRegMessage className="h-5 w-5" />,
        label: 'Review Messages',
        path: '/review-messages',
      },
      {
        key: 'faqs',
        icon: <BsFillQuestionSquareFill className="h-5 w-5" />,
        label: 'Faqs',
        path: '/faqs',
      },

      {
        key: 'about-us',
        icon: <FcAbout className="h-5 w-5" />,
        label: 'About Us',
        path: '/about-us',
      },
      {
        key: 'privacy-policy',
        icon: <MdPrivacyTip className="h-5 w-5" />,
        label: 'Privacy Policy',
        path: '/privacy-policy',
      },
      {
        key: 'terms-and-conditions',
        icon: <FaComputerMouse className="h-5 w-5" />,
        label: 'Terms & Conditions',
        path: '/terms-and-conditions',
      },
      {
        key: 'refund-policy',
        icon: <HiReceiptRefund className="h-5 w-5" />,
        label: 'Refund Policy',
        path: '/refund-policy',
      },

      // {
      //   key: 'keyword-management',
      //   icon: <TbSquareKey className="h-5 w-5" />,
      //   label: 'Keyword Management',
      //   path: '/keyword-management',
      // },
      // {
      //   key: 'user-management',
      //   icon: <FaUser className="h-5 w-5" />,
      //   label: 'User Management',
      //   children: [
      //     {
      //       key: 'user-profile',
      //       label: 'User Profile',
      //       path: '/user-profile',
      //     },
      //     {
      //       key: 'artist-profile',
      //       label: 'Artist Profile',
      //       path: '/artist-profile',
      //     },
      //     {
      //       key: 'business-profile',
      //       label: 'Business Profile',
      //       path: '/business-profile',
      //     },
      //   ],
      // },
      // {
      //   key: 'report',
      //   icon: <MdReport className="h-5 w-5" />,
      //   label: 'Report',
      //   path: '/report',
      // },
    ],
    []
  );

  const isRouteActive = useCallback(
    path =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
    [location.pathname]
  );

  useEffect(() => {
    const activeDropdown = menuItems.find(
      item =>
        item.children && item.children.some(child => isRouteActive(child.path))
    );

    if (activeDropdown) {
      setOpenDropdown(activeDropdown.key);
    }
  }, [isRouteActive, menuItems]);

  const toggleDropdown = key => {
    setOpenDropdown(prev => (prev === key ? '' : key));
  };

  // handleLogout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between rounded-3xl bg-white/80 px-4 py-6 shadow-sm backdrop-blur md:rounded-none md:px-6">
      <div>
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
          <img
            src={getCleanImageUrl(user?.image)}
            alt={user?.fullName ?? 'Admin'}
            className="h-12 w-12 rounded-full border border-white object-cover shadow-sm"
          />
          <div>
            <p className="text-[11px] uppercase tracking-wide text-primary/60">
              Logged in as
            </p>
            <p className="text-sm font-semibold text-primary">
              {user?.fullName ?? 'Admin'}
            </p>
            {user?.role && (
              <p className="text-xs text-primary/70">{user.role}</p>
            )}
          </div>
        </div>

        <nav className="space-y-3">
          {menuItems.map(item => {
            const dropdownIsActive = item.children?.some(child =>
              isRouteActive(child.path)
            );

            const isOpen = openDropdown === item.key;

            return (
              <div key={item.key} className="space-y-2">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.key)}
                      className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                        dropdownIsActive
                          ? 'border-primary/40 bg-primary/10 text-primary shadow-sm'
                          : 'border-transparent bg-white text-gray-700 shadow-sm hover:border-primary/20 hover:bg-primary/5 '
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </span>
                      <BiChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? 'rotate-180 text-primary' : 'text-gray-400'
                        }`}
                      />
                    </button>
                    <div
                      className={`space-y-2 overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.children.map(child => (
                        <NavLink
                          key={child.key}
                          to={child.path}
                          onClick={() => onClose?.()}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-2xl border px-4 py-2 text-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-black ${
                              isActive
                                ? 'border-primary/40 bg-primary text-white shadow-sm'
                                : 'border-transparent bg-white text-gray-700 shadow-sm'
                            }`
                          }
                        >
                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => onClose?.()}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-black ${
                        isActive
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-transparent bg-white text-gray-700 shadow-sm'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <button
        type="button"
        onClick={() => {
          handleLogout();
          onClose?.();
        }}
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
      >
        <FiLogOut className="h-5 w-5" />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
