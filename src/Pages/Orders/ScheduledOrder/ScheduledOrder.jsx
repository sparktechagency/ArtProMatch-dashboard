/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Input, Space, Table } from "antd";
import { useState } from "react";

import { Button, Modal } from "antd";
import { FaCalendar, FaEye, FaStopwatch, FaUser } from "react-icons/fa";
// import { AllImages } from "../../../assets/image/AllImages";
import { FiUserCheck } from "react-icons/fi";
import { LiaUserSlashSolid } from "react-icons/lia";
import { SearchOutlined } from "@ant-design/icons";
import { LuRefreshCcw } from "react-icons/lu";
const ScheduledOrder = () => {
  const userData = [
    {
      id: "#1239",
      name: "Mr. Mahmud",
      email: "mr101@mail.ru",
      profileImage: <FaUser></FaUser>, // Placeholder image URL
      date: "2024-03-27",
      time: "10:00 AM",
      "artist-name": "John Doe",
      service: "Tattoo",
    },
    {
      id: "#1240",
      name: "Ms. Sarah",
      email: "sarah99@mail.com",
      profileImage: <FaUser></FaUser>,
      date: "2024-03-28",
      time: "02:30 PM",
      "artist-name": "Jane Smith",
      service: "Piercing",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSearch = () => {
    // refetc();
  };

  const handleSession = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slno",
      key: "slno",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md bg-primary"
            src={record?.profileImage}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Artist Name",
      dataIndex: "artist-name",
      key: "artist-name",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: "rgb(47,84,235)",
                defaultHoverColor: "rgb(47,84,235)",
                defaultBorderColor: "rgb(47,84,235)",
              },
            },
          }}
        >
          <Space size="middle">
            <Button
              onClick={() => showModal(record)}
              icon={<FaEye className="text-primary" />}
            />

            <Button
              onClick={() => handleSession(record)}
              icon={<FiUserCheck className="h-5 w-5 text-green-500" />}
            />
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Scheduled Order
        </h3>
        <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: "none",
                    activeBorderColor: "none",
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search by email"
                  allowClear
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                  }
                />

                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primaryColor text-white p-2 rounded-r-lg"
                >
                  search
                </button>
              </div>
            </ConfigProvider>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={userData || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        {selectedUser && (
          <div className="p-2">
            {/* Header Section */}
            <div className="bg-primary py-5 text-center">
              {selectedUser?.profileImage && (
                <Avatar size={200} src={selectedUser.profileImage} />
              )}
              {selectedUser?.name && (
                <h2 className="text-2xl font-bold mt-4 text-textColor">
                  Artist: {selectedUser.name}
                </h2>
              )}
              {selectedUser?.service && (
                <h2 className="text-xl mt-4 text-textColor">
                  {selectedUser.service}
                </h2>
              )}
            </div>

            {/* Dynamic Details Section */}
            <div className="my-6">
              {selectedUser?.email && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Email :</p>
                  <p>{selectedUser.email}</p>
                </div>
              )}
              {selectedUser?.["artist-name"] && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Artist Name :</p>
                  <p>{selectedUser["artist-name"]}</p>
                </div>
              )}
              {selectedUser?.date && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Order Date :</p>
                  <p>{selectedUser.date}</p>
                </div>
              )}
              {selectedUser?.time && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Time :</p>
                  <p>{selectedUser.time}</p>
                </div>
              )}
              {selectedUser?.contact && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Contact No :</p>
                  <p>{selectedUser.contact}</p>
                </div>
              )}
              {selectedUser?.address && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Address :</p>
                  <p>{selectedUser.address}</p>
                </div>
              )}
              {selectedUser?.dob && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Date of Birth :</p>
                  <p>{selectedUser.dob}</p>
                </div>
              )}

              {/* CV & Certification */}
              {selectedUser?.cv && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">
                    CV & Certification:
                  </p>
                  <p className="text-primary cursor-pointer">View</p>
                </div>
              )}

              {/* Availability (Only Show if Date & Time Exist) */}
              {selectedUser?.availability && (
                <div className="flex gap-2 mb-4">
                  <p className="text-gray-600 font-semibold">Availability:</p>
                  <p className="flex gap-2 justify-start items-center">
                    <FaCalendar className="text-primary" /> Mon-Fri
                  </p>
                  <p className="flex gap-2 justify-start items-center">
                    <FaStopwatch className="text-primary" /> 10:00 AM - 6:00 PM
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ScheduledOrder;
