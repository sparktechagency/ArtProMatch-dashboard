import { Avatar, Upload, ConfigProvider, Input, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { FaCamera, FaLockOpen } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import userDefaultImage from '../../assets/image/user.png';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser, setUser } from '../../redux/features/auth/authSlice';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';
import {
  useUpdateProfileMutation,
  useUpdateProfilePhotoMutation,
  useChangePasswordMutation,
} from '../../redux/features/auth/authApi';
import { verifyToken } from '../../utils/verifyToken';
import { toast } from 'sonner';
import { TbFidgetSpinner } from 'react-icons/tb';

const AdminProfile = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [profilePic, setProfilePic] = useState(() =>
    user?.image ? getCleanImageUrl(user.image) : userDefaultImage
  );
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Edit Profile');
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [updateProfilePhoto, { isLoading: isUploadingPhoto }] =
    useUpdateProfilePhotoMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user?.image) {
      setProfilePic(getCleanImageUrl(user.image));
    }
  }, [user?.image]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName ?? user.name ?? '',
        email: user.email ?? '',
        phone: user.contact ?? user.phone ?? '',
        address: user.stringLocation ?? '',
      });
    }
  }, [form, user]);

  // togglePasswordVisibility
  const togglePasswordVisibility = type => {
    if (type === 'current') setShowCurrentPassword(!showCurrentPassword);
    else if (type === 'new') setShowNewPassword(!showNewPassword);
    else setShowConfirmPassword(!showConfirmPassword);
  };

  // toggleEditMode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // handleProfilePhotoUpload
  const handleProfilePhotoUpload = async file => {
    if (!file) return false;

    const previewUrl = URL.createObjectURL(file);
    setProfilePic(previewUrl);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await updateProfilePhoto(formData).unwrap();

      if (res?.success) {
        const updatedUser = verifyToken(res.data.accessToken);
        dispatch(
          setUser({
            user: updatedUser,
            accessToken: res.data.accessToken,
          })
        );
        toast.success('Profile photo updated successfully!');
      }
    } catch (error) {
      console.error('Profile photo update error:', error);
      toast.error('Failed to update profile photo');
      if (user?.image) {
        setProfilePic(getCleanImageUrl(user.image));
      } else {
        setProfilePic(userDefaultImage);
      }
    }

    return false;
  };

  // handleUpdateProfile
  const handleUpdateProfile = async values => {
    const data = {
      fullName: values.fullName,
      stringLocation: values.address,
    };

    try {
      const res = await updateProfile(data).unwrap();

      if (res?.success) {
        const updatedUser = verifyToken(res.data.accessToken);
        dispatch(
          setUser({
            user: updatedUser,
            accessToken: res.data.accessToken,
          })
        );
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  //onChangePassword
  const handleChangePassword = async values => {
    const { oldPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      toast.error('New password and Confirm Password do not match!');
      return;
    }

    try {
      const res = await changePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      if (res?.success) {
        const updatedUser = verifyToken(res.data.accessToken);
        dispatch(
          setUser({
            user: updatedUser,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        toast.success(res?.message);
        passwordForm.resetFields();
      }
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage =
        error?.data?.message ?? 'Failed to change password. Please try again.';
      toast.error(errorMessage);
    }
  };

  // profileDetails
  const profileDetails = useMemo(
    () => [
      { label: 'Full Name', value: user?.fullName ?? user?.name ?? 'Not set' },
      { label: 'Email', value: user?.email ?? 'Not set' },
      // {
      //   label: 'Contact Number',
      //   value: user?.contact ?? user?.phone ?? 'Not set',
      // },
      { label: 'Address', value: user?.stringLocation ?? 'Not set' },
      { label: 'Role', value: user?.role ?? 'Not set' },
    ],
    [user]
  );

  const displayedAvatar = profilePic || userDefaultImage;
  const displayName = user?.fullName ?? user?.name ?? 'Administrator';
  const displayTagline = user?.role
    ? `${user.role} • Steady Hands`
    : 'Team Member';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 px-4 py-8 sm:px-6 lg:px-10">
      {/* Profile Header */}
      <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,106,107,0.25),transparent_60%)]" />
        <div className="relative flex flex-col items-center gap-6 px-6 pb-10 pt-12 text-center sm:px-10 lg:flex-row lg:items-end lg:gap-12 lg:text-left">
          <div className="relative">
            <Avatar
              size={160}
              src={displayedAvatar}
              className="border-4 border-white shadow-2xl"
            />

            {isUploadingPhoto && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white">
                <TbFidgetSpinner className="h-8 w-8 animate-spin" />
              </div>
            )}

            <Upload
              showUploadList={false}
              accept="image/*"
              beforeUpload={handleProfilePhotoUpload}
              disabled={isUploadingPhoto}
              className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-2 shadow-md transition hover:scale-105"
            >
              <FaCamera className="h-5 w-5 text-primary" />
            </Upload>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-neutral-800 sm:text-4xl">
                {displayName}
              </h1>
              <p className="text-sm uppercase tracking-[0.35em] text-primary/60">
                Profile Overview
              </p>
              <p className="text-sm text-primary/80">{displayTagline}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {profileDetails.slice(0, 4).map(detail => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-left"
                >
                  <p className="text-xs uppercase tracking-wide text-primary/60">
                    {detail.label}
                  </p>
                  <p className="text-sm font-medium text-neutral-700">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={toggleEditMode}
            className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
          >
            {isEditing ? (
              <>
                <MdOutlineCancel className="h-5 w-5" />
                Cancel
              </>
            ) : (
              <>
                <FaUserEdit className="h-5 w-5" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </section>

      {/* Tabs for Edit Profile and Change Password */}
      <div className="mx-auto mt-10 flex w-full max-w-4xl justify-center gap-3 rounded-full bg-white/60 p-2 shadow-inner">
        {[
          { key: 'Edit Profile', label: 'Profile Details' },
          { key: 'Change Password', label: 'Password Settings' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeTab === tab.key
                ? 'bg-primary text-white shadow'
                : 'text-primary/70 hover:bg-primary/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'Edit Profile' && (
        <section className="mx-auto mt-8 w-full max-w-5xl rounded-3xl bg-white/95 p-8 shadow-lg backdrop-blur">
          {!isEditing ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {profileDetails.map(detail => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-wide text-primary/60">
                    {detail.label}
                  </p>
                  <p className="text-base font-medium text-neutral-700">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <ConfigProvider>
              <Form
                form={form}
                onFinish={handleUpdateProfile}
                layout="vertical"
                className="grid gap-6 md:grid-cols-2"
              >
                <Form.Item
                  name="fullName"
                  label={
                    <p className="text-sm font-semibold text-neutral-600">
                      Full Name
                    </p>
                  }
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input size="large" placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label={
                    <p className="text-sm font-semibold text-neutral-600">
                      Email Address (Read-Only)
                    </p>
                  }
                  rules={[
                    { required: true, message: 'Please enter your email' },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Email"
                    type="email"
                    readOnly
                  />
                </Form.Item>
                {/* <Form.Item
                  name="phone"
                  label={
                    <p className="text-sm font-semibold text-neutral-600">
                      Contact Number
                    </p>
                  }
                >
                  <Input size="large" placeholder="Contact Number" />
                </Form.Item> */}
                <Form.Item
                  name="address"
                  label={
                    <p className="text-sm font-semibold text-neutral-600">
                      Address
                    </p>
                  }
                >
                  <Input size="large" placeholder="Address" />
                </Form.Item>
                <Form.Item className="md:col-span-2">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full rounded-2xl bg-primary px-10 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        <TbFidgetSpinner className="h-5 w-5 animate-spin" />
                        <span>Saving...</span>
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          )}
        </section>
      )}

      {activeTab === 'Change Password' && (
        <section className="mx-auto mt-8 w-full max-w-3xl rounded-3xl bg-white/95 p-8 shadow-lg backdrop-blur">
          <p className="text-center text-lg font-semibold text-neutral-700">
            Update your password to keep your account secure
          </p>
          <ConfigProvider>
            <Form
              form={passwordForm}
              onFinish={handleChangePassword}
              layout="vertical"
              className="mt-6 space-y-6"
            >
              <Form.Item
                name="oldPassword"
                label={
                  <p className="text-sm font-semibold text-neutral-600">
                    Current Password
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: 'Please enter your current password!',
                  },
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showCurrentPassword ? <FaLockOpen /> : <IoIosLock />}
                  </button>
                </div>
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={
                  <p className="text-sm font-semibold text-neutral-600">
                    New Password
                  </p>
                }
                rules={[
                  { required: true, message: 'Please enter a new password!' },
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showNewPassword ? <FaLockOpen /> : <IoIosLock />}
                  </button>
                </div>
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={
                  <p className="text-sm font-semibold text-neutral-600">
                    Confirm Password
                  </p>
                }
                dependencies={['newPassword']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Passwords do not match!')
                      );
                    },
                  }),
                ]}
              >
                <div className="relative">
                  <Input
                    size="large"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                  >
                    {showConfirmPassword ? <FaLockOpen /> : <IoIosLock />}
                  </button>
                </div>
              </Form.Item>

              <Form.Item>
                <button
                  disabled={isChangingPassword}
                  type="submit"
                  className="w-full rounded-2xl bg-primary px-10 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary/90"
                >
                  {isChangingPassword ? (
                    <span className="flex items-center justify-center gap-2 text-white">
                      <TbFidgetSpinner className="h-5 w-5 animate-spin" />
                      <span>Updating...</span>
                    </span>
                  ) : (
                    'Update'
                  )}
                </button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </section>
      )}
    </div>
  );
};

export default AdminProfile;
