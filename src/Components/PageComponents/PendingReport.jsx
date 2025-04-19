/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Input, Space, Table } from "antd";
import { useState } from "react";
import tatto from "../../assets/image/tatto.jpg";
import { Button, Modal } from "antd";
import { FaEye, FaUser } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";
const PendingReport = () => {
  const userData = [
    {
      id: "#1239",
      name: "Mr. Mahmud",
      email: "mr101@mail.ru",
      profileImage: <FaUser />,
      date: "2024-03-27",
      time: "10:00 AM",
      "artist-name": "John Doe",
      service: "Tattoo",

      address: "New York, America",
      payment: "Online",
      price: "200",
      method: "Delivery",
      description:
        "A black-and-gray realism tattoo designed to create a bold and lasting impression. The client requested intricate details with shading to enhance depth and texture.",
      images: [tatto, tatto, tatto],
      orderItems: [
        { item: "Oral Tattoo (Small)", price: 130 },
        { item: "Realism Tattoo", price: 70 },
      ],
    },
    {
      id: "#1240",
      name: "Ms. Sarah",
      email: "sarah99@mail.com",
      profileImage: <FaUser />,
      date: "2024-03-28",
      time: "02:30 PM",
      "artist-name": "Jane Smith",
      service: "Piercing",

      address: "Los Angeles, USA",
      payment: "Cash",
      method: "Pickup",
      price: "200",
      description:
        "A modern and stylish ear and nose piercing service tailored to enhance facial aesthetics. The client preferred a minimalist approach with high-quality titanium jewelry.",
      images: [tatto, tatto],
      orderItems: [
        { item: "Ear Piercing", price: 50 },
        { item: "Nose Piercing", price: 40 },
      ],
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
      title: "ID No",
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={userData || []}
          pagination={false}
          rowKey="id"
        />
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <div className="p-4">
            {/* Order Header */}
            {/* <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Order {selectedUser.id}</h2>
              <p className="text-gray-600 text-sm">
                Order {selectedUser.date} {selectedUser.time}
              </p>
            </div> */}

            {/* User & Reported Profile */}
            <div className="grid grid-cols-2 gap-4 border p-4 my-4">
              {/* User Info */}
              <div>
                <h3 className="font-semibold border-b pb-1">
                  Profile Information
                </h3>
                <p>
                  <strong>Name:</strong> {selectedUser.name}
                </p>
                <p>
                  <strong>date:</strong> {selectedUser.date}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser["address"]}
                </p>
                <p>
                  <strong>From:</strong> {"User"}
                </p>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="font-semibold border-b pb-1">
                  Reported Profile
                </h3>
                <p>
                  <strong>Name:</strong> {selectedUser.Name}
                </p>
                <p>
                  <strong>date:</strong> {selectedUser.date}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser["address"]}
                </p>
                <p>
                  <strong>From:</strong> {"Business"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Reason For Report</h3>
              <p className="text-gray-600 text-sm">
                The profile report highlights data completeness and identifies
                inconsistencies, enabling better data quality assessment. It
                offers key statistics, missing values, and distributions for
                informed decision-making.
              </p>
            </div>

            {/* Sample Images */}
            {selectedUser.images && selectedUser.images.length > 0 && (
              <div className="my-4">
                <h3 className="font-semibold border-b pb-1">
                  Verify Screen Shoot
                </h3>
                <div className="flex gap-2 mt-2">
                  {selectedUser.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Sample"
                      className="w-24 h-24 object-cover border"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-start items-center gap-2">
              <button className="px-4 py-2  border border-red-500 text-red-500">
            
                Reject
              </button>
              <button className="px-4 py-2  bg-red-500 text-white">
            
                Block
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingReport;
