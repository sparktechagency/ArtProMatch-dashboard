import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/Main/Main';
import Analytics from '../Pages/Analytics';
import LogIn from '../Pages/Auth/LogIn';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import ResetPassword from '../Pages/Auth/ResetPassword';
import NewPassword from '../Pages/Auth/NewPassword';
import VerifyPassword from '../Pages/Auth/VerifyPassword';
import Payments from '../Pages/Payments';
import AdminProfile from '../Pages/AdminProfile';
import UserProfile from '../Pages/UserProfile';
import ArtistProfile from '../Pages/ArtistProfile';
import BusinessProfile from '../Pages/BusinessProfile';
import Report from '../Pages/Report';
// import ReviewImages from '../Pages/ReviewImages';
import ReviewMessages from '../Pages/ReviewMessages';
import KeywordManagement from '../Pages/KeywordManagement';
import PrivateRoute from './PrivateRoute';
import Bookings from '../Pages/Bookings';
import AllClients from '../Pages/AllClients';
import AllArtists from '../Pages/AllArtists';
import AllBusinesses from '../Pages/AllBusinesses';
import Faqs from '../Pages/Faqs';
import AboutUsPage from '../Pages/AboutUsPage';
import PrivacyPolicyPage from '../Pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '../Pages/TermsAndConditionsPage';
import RefundPolicyPage from '../Pages/RefundPolicyPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LogIn />,
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
    element: <NewPassword />,
  },
  {
    path: '/',

    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Analytics />,
      },
      {
        path: '/all-clients',
        element: <AllClients />,
      },
      {
        path: '/all-artists',
        element: <AllArtists />,
      },
      {
        path: '/all-businesses',
        element: <AllBusinesses />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/payments',
        element: <Payments />,
      },
      // {
      //   path: '/review-images',
      //   element: <ReviewImages />,
      // },
      {
        path: '/review-messages',
        element: <ReviewMessages />,
      },
      {
        path: '/faqs',
        element: <Faqs />,
      },
      {
        path: '/about-us',
        element: <AboutUsPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '/terms-and-conditions',
        element: <TermsAndConditionsPage />,
      },
      {
        path: '/refund-policy',
        element: <RefundPolicyPage />,
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
        path: '/keyword-management',
        element: <KeywordManagement />,
      },
    ],
  },
]);
