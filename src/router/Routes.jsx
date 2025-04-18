import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import Analytics from "../Pages/Analytics/Analytics";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import ResetPass from "../Pages/Auth/ResetPass/ResetPass";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";

import ScheduledOrder from "../Pages/Orders/ScheduledOrder/ScheduledOrder";
import CompleteadOrders from "../Pages/Orders/CompleteadOrders/CompleteadOrders";
import Payments from "../Pages/Payments/Payments";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import UserProfile from "../Pages/UserProfile/UserProfile";
import ArtistProfile from "../Pages/ArtistProfile/ArtistProfile";
import BusinessProfile from "../Pages/BusinessProfile/BusinessProfile";
import Report from "../Pages/Report/Report";
import ReviewImages from "../Pages/ReviewImages/ReviewImages";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn></SignIn>,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword></ForgatePassword>,
  },
  {
    path: "/varification",
    element: <VerifyPass></VerifyPass>,
  },
  {
    path: "/reset-password",
    element: <ResetPass></ResetPass>,
  },
  {
    path: "/new-password",
    element: <Newpass></Newpass>,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Analytics />,
      },
      {
        path: "/scheduled",
        element: <ScheduledOrder />,
      },
      {
        path: "/completed",
        element: <CompleteadOrders />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/artist-profile",
        element: <ArtistProfile />,
      },
      {
        path: "/business-profile",
        element: <BusinessProfile />,
      },
      {
        path:'/report',
        element:<Report></Report>
      },
      {
        path:"/review-images",
        element:<ReviewImages/>
      }
    ],
  },
]);
