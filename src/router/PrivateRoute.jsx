import { useAppSelector } from '../redux/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectAccessToken } from '../redux/features/auth/authSlice';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const accessToken = useAppSelector(selectAccessToken);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate state={{ from: location }} to="/login" replace={true} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
