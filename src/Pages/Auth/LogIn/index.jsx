import { Checkbox, Form, Input, Typography } from 'antd';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosLock } from 'react-icons/io';
import { FaLockOpen } from 'react-icons/fa';
import { useLoginMutation } from '../../../redux/features/auth/authApi';
import { verifyToken } from '../../../utils/verifyToken';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { selectUser, setUser } from '../../../redux/features/auth/authSlice';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';

const LogIn = () => {
  const dispatch = useAppDispatch();
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const user = useAppSelector(selectUser);

  // togglePasswordVisibility
  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };

  const [login, { isLoading }] = useLoginMutation();

  // handleLogin
  const handleLogin = async values => {
    const credentials = {
      email: values.email,
      password: values.password,
      fcmToken: 'no_fcm_token',
    };

    try {
      const res = await login(credentials).unwrap();

      if (res?.success) {
        const user = verifyToken(res.data.accessToken);

        if (user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN') {
          dispatch(
            setUser({
              user: user,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            })
          );

          toast.success(res?.message);

          setTimeout(() => {
            navigate(from, { replace: true });
          }, 10);
        } else {
          toast.error('You are not permitted to login here!');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="bg-[ffffff]">
      <div className="container mx-auto">
        <div className="  ">
          {/* <div className="w-full md:w-[50%] px-3 mt-10">
                        <img src={brandlogo} alt="brandlogo" className="h-10 w-10 " />
                    </div> */}
          <div className="w-full  ">
            <div className=" py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
              <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ maxWidth: 550 }}
                onFinish={handleLogin}
                layout="vertical"
                className="bg-[#eae6e6]  py-28 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px] border-2 shadow-xl"
              >
                <div className="mb-4 text-center">
                  <h2 className=" text-center text-2xl md:text-3xl font-bold mb-6">
                    Login to Account
                  </h2>
                  <Typography.Text className="text-black text-center text-base ">
                    {' '}
                    Please enter your name, email and password to continue
                  </Typography.Text>
                </div>

                <Form.Item
                  name="email"
                  label={<p className=" text-md">Email</p>}
                >
                  <Input
                    required
                    style={{ padding: '6px' }}
                    className=" text-md"
                    placeholder="Your Email"
                    autoComplete="email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={<p className=" text-md">Password</p>}
                >
                  <div className="relative flex justify-center items-center">
                    <Input
                      required
                      style={{ padding: '6px' }}
                      className=" text-md"
                      type={showpassword ? 'password' : 'text'}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <div className="flex justify-center absolute right-0 px-3">
                      <button onClick={togglePasswordVisibility} type="button">
                        {showpassword ? (
                          <IoIosLock className="" />
                        ) : (
                          <FaLockOpen className="" />
                        )}
                      </button>
                    </div>
                  </div>
                </Form.Item>
                <div className="flex justify-between items-center my-2">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      required
                      className=" text-black text-md hover:text-black text-md"
                    >
                      Remember Password
                    </Checkbox>
                  </Form.Item>
                  <Link to="/forgot-password" className=" ">
                    <p className="text-blue-600  ">Forget Password</p>
                  </Link>
                </div>
                <Form.Item className="text-center my-10">
                  <button
                    disabled={isLoading}
                    className="bg-primary text-center w-full  p-2 font-semibold    text-white px-10 py-2 rounded-md shadow-lg"
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        <TbFidgetSpinner className="h-5 w-5 animate-spin" />
                        <span>Logging in...</span>
                      </span>
                    ) : (
                      'Login'
                    )}
                  </button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
