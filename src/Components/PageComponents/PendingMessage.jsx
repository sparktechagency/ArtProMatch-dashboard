/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Space, Table } from "antd";
import { useState } from "react";
import tatto from "../../assets/image/tatto.jpg";
import { Button, Modal } from "antd";
import { FaEye, FaSearch, FaUser } from "react-icons/fa";
import user from "../../assets/image/user.png";
const PendingMessage = () => {
  const userData = [
    {
      id: "#1239",
      name: "Mr. Mahmud",
      email: "mr101@mail.ru",
      profileImage: <FaUser />,
      phone: "0123456789",
      time: "10:00 AM",
      "artist-name": "John Doe",
      service: "Tattoo",
      date: "2023-10-01",
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
      phone: "0123456789",
      time: "02:30 PM",
      "artist-name": "Jane Smith",
      service: "Piercing",
      date: "2023-10-02",
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
                  <strong>phone:</strong> {selectedUser.phone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser["address"]}
                </p>
              </div>
            </div>

            {/* message  */}
            <h3 className="font-semibold border-b pb-1">Review Message</h3>
            <div className="border p-4 my-4 rounded-lg">
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <img src={user} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p>2023-10-02</p>
                  </div>
                </div>
                <FaSearch />
              </div>
              <div className="my-5">
                <div className="flex flex-col gap-2 items-end justify-end">
                  <div className="flex gap-2 items-center justify-center">
                    <img src={user} alt="" />
                    <p className="text-gray-600 mt-2 bg-gray-100 p-2 rounded-e-lg rounded-b-lg">
                      {selectedUser.description}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm">2023-10-02</p>
                </div>
                <div className="flex flex-col gap-2 items-start justify-end mt-5">
                  <div className="flex gap-2 items-center justify-center">
                    <p className="text-gray-600 mt-2 bg-gray-100 p-2 rounded-s-lg rounded-b-lg">
                      {selectedUser.description}
                    </p>
                    <img src={user} alt="" />
                  </div>
                  <p className="text-gray-600 text-sm">2023-10-02</p>
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 mt-5">
              <button className="px-4 py-2 border border-green-500 text-green-500  rounded-md">
               Ignore
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md">
                Warning
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PendingMessage;
