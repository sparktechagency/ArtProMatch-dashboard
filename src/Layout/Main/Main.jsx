import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import {
  ConfigProvider,
  Drawer,
  //  Modal
} from 'antd';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaX } from 'react-icons/fa6';
// import { IoIosNotificationsOutline } from 'react-icons/io';
import brandlogo from '../../assets/image/Logo.png';
// import NotificationModal from '../../Components/PageComponents/NotificationModal/NotificationModal';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/features/auth/authSlice';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const MainLayout = () => {
  const user = useAppSelector(selectUser);

  const [drawer, setDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  const toggleDrawer = () => setDrawer(!drawer);
  const closeDrawer = () => setDrawer(false);

  const handleNavigateHome = () => {
    navigate('/');
    if (isMobile) {
      closeDrawer();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) closeDrawer();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const [isModalOpenForNotification, setIsModalOpenForNotification] =
  //   useState(false);

  // const showModalForNotification = () => {
  //   setIsModalOpenForNotification(true);
  // };

  // const handleOkForNotification = () => {
  //   setIsModalOpenForNotification(false);
  // };

  // const handleCancelForNotification = () => {
  //   setIsModalOpenForNotification(false);
  // };

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
        <div className="flex min-h-screen w-full bg-[#f3f4f6]">
          {/* Sidebar for Mobile */}
          {isMobile ? (
            <Drawer
              title={null}
              placement="left"
              closable={true}
              onClose={closeDrawer}
              open={drawer}
              width="85%"
              closeIcon={<FaX className="text-black" />}
              contentWrapperStyle={{ borderRadius: '18px', overflow: 'hidden' }}
            >
              <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleNavigateHome}
                    className="flex items-center gap-2 rounded-2xl px-2 py-1 text-left transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <img
                      src={brandlogo}
                      alt="brandlogo"
                      className="h-10 w-10"
                    />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary/60">
                        Steady Hands
                      </p>
                      <h2 className="text-lg font-semibold text-primary">
                        Admin Panel
                      </h2>
                    </div>
                  </button>
                  <button
                    onClick={closeDrawer}
                    className="rounded-full bg-primary/10 p-2 text-primary transition hover:bg-primary/20"
                  >
                    <FaX className="h-4 w-4" />
                  </button>
                </div>
                <Sidebar onClose={closeDrawer} />
              </div>
            </Drawer>
          ) : (
            <div className="hidden h-full border-r border-primary/10 bg-gradient-to-b from-white to-primary/5 lg:flex lg:w-[300px] lg:flex-col">
              <button
                type="button"
                onClick={handleNavigateHome}
                className="flex flex-col items-center gap-2 border-b border-primary/10 px-6 pb-6 pt-8 text-primary transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <img src={brandlogo} alt="brandlogo" className="h-14 w-14" />
                <h1 className="text-2xl font-bold">Steady Hands</h1>
                <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
                  Admin Portal
                </p>
              </button>
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <Sidebar />
              </div>
            </div>
          )}

          <div
            className={`flex-1 ${
              isMobile ? 'px-3 pb-6 pt-4' : 'px-10 pb-10 pt-8'
            }`}
          >
            <div className="flex h-20 items-center justify-between gap-4 rounded-3xl bg-white/70 px-4 shadow-sm backdrop-blur">
              {isMobile && (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={toggleDrawer}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition hover:bg-primary/20"
                  >
                    <GiHamburgerMenu className="h-5 w-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    <img src={brandlogo} alt="brandlogo" className="h-7 w-7" />
                    <p className="text-sm font-semibold text-primary">
                      Steady Hands
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={showModalForNotification}
                      className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition hover:bg-primary/10"
                    >
                      <IoIosNotificationsOutline className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-semibold text-white">
                        1
                      </span>
                    </button> */}
                    <Link to="/admin-profile">
                      <img
                        src={getCleanImageUrl(user?.image)}
                        alt="Admin"
                        className="h-11 w-11 rounded-2xl object-cover shadow-sm"
                      />
                    </Link>
                  </div>
                </div>
              )}

              {!isMobile && (
                <div className="flex w-full items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary/60">
                      Welcome back,
                    </p>
                    <h2 className="text-xl font-semibold text-primary">
                      {user?.fullName ?? 'Admin'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* <button
                      onClick={showModalForNotification}
                      className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition hover:bg-primary/10"
                    >
                      <IoIosNotificationsOutline className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-semibold text-white">
                        1
                      </span>
                    </button> */}
                    <Link to="/admin-profile">
                      <div className="flex items-center gap-3 rounded-2xl bg-white/60 px-3 py-2 shadow-sm">
                        <img
                          src={getCleanImageUrl(user?.image)}
                          alt="Admin"
                          className="h-12 w-12 rounded-2xl object-cover shadow-sm"
                        />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-primary/60">
                            Account
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            {user?.role ?? 'Administrator'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 min-h-[calc(100vh-8rem)] rounded-3xl bg-white/85 p-5 shadow-sm backdrop-blur">
              <Outlet />
            </div>
          </div>
        </div>
      </ConfigProvider>

      {/* <Modal
        open={isModalOpenForNotification}
        onOk={handleOkForNotification}
        onCancel={handleCancelForNotification}
      >
        <NotificationModal />
      </Modal> */}
    </div>
  );
};

export default MainLayout;
