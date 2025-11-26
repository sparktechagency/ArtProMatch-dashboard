import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/Main/Main';
import Analytics from '../Pages/Analytics';
import SignIn from '../Pages/Auth/SignIn/SignIn';
import ForgotPassword from '../Pages/Auth/ForgatePassword/ForgatePassword';
import ResetPassword from '../Pages/Auth/ResetPass/ResetPass';
import Newpassword from '../Pages/Auth/NewPass/Newpass';
import VerifyPassword from '../Pages/Auth/VerifyPass/VerifyPass';
import ScheduledOrders from '../Pages/Orders/ScheduledOrders';
import CompletedOrders from '../Pages/Orders/CompletedOrders';
import Payments from '../Pages/Payments';
import AdminProfile from '../Pages/AdminProfile';
import UserProfile from '../Pages/UserProfile';
import ArtistProfile from '../Pages/ArtistProfile';
import BusinessProfile from '../Pages/BusinessProfile';
import Report from '../Pages/Report';
import ReviewImages from '../Pages/ReviewImages';
import ReviewMessage from '../Pages/ReviewMessage';
import KeywordManagement from '../Pages/KeywordManagement';

export const router = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/varification',
    element: <VerifyPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/new-password',
    element: <Newpassword />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Analytics />,
      },
      {
        path: '/scheduled',
        element: <ScheduledOrders />,
      },
      {
        path: '/completed',
        element: <CompletedOrders />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
      {
        path: '/admin-profile',
        element: <AdminProfile />,
      },
      {
        path: '/user-profile',
        element: <UserProfile />,
      },
      {
        path: '/artist-profile',
        element: <ArtistProfile />,
      },
      {
        path: '/business-profile',
        element: <BusinessProfile />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/review-images',
        element: <ReviewImages />,
      },
      {
        path: '/review-messages',
        element: <ReviewMessage />,
      },
      {
        path: '/keyword-management',
        element: <KeywordManagement />,
      },
    ],
  },
]);
