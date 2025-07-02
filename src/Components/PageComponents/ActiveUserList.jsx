/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Input, Space, Table } from "antd";
import { useState } from "react";
import tatto from "../../assets/image/tatto.jpg";
import { Button, Modal } from "antd";
import { FaEye, FaUser } from "react-icons/fa";
import { FiUserCheck } from "react-icons/fi";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllClientsQuery } from "../../redux/features/usersApi/usersApi";
const ActiveUserList = () => {
  const { data: clientsData } = useGetAllClientsQuery();
  // console.log("data:", clientsData?.data);
  const userData = clientsData?.data;

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
          <span>{record.auth?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
       render: (_, record) => (
        <div className="flex items-center gap-2">
         
          <span>{record.auth?.email}</span>
        </div>
      ),
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
        render: (_, record) => (
        <div className="flex items-center gap-2">
         
          <span>{record.auth?.phoneNumber}</span>
        </div>
      ),
    },

    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },

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

            {/* User & Delivery Info */}
            <div className="grid grid-cols-2 gap-4 border p-4 my-4">
              {/* User Info */}
              <div>
                <h3 className="font-semibold border-b pb-1">
                  User Information
                </h3>
                <p>
                  <strong>Name:</strong> {selectedUser.auth?.fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser?.auth.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.auth.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser?.location?.coordinates}
                </p>
                <p>
                  <strong>Looking For:</strong> {selectedUser?.lookingFor}
                </p>
                <p>
                  <strong>Favorite Tattoos:</strong> {selectedUser?.favoriteTattoos}
                </p>
              </div>

              {/* Delivery Info */}
              {/* <div>
                <h3 className="font-semibold border-b pb-1">Delivery Info</h3>
                <p>
                  <strong>Address:</strong> {selectedUser.address}
                </p>
                <p>
                  <strong>Payment:</strong> {selectedUser.payment}
                </p>
                <p>
                  <strong>Method:</strong> {selectedUser.method}
                </p>
              </div> */}
            </div>

            {/* Description */}
            {/* <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">
                Description About Tattoo Idea
              </h3>
              <p className="text-gray-600 text-sm">
                {selectedUser.description}
              </p>
            </div> */}

            {/* Sample Images */}
            {/* {selectedUser.images && selectedUser.images.length > 0 && (
              <div className="my-4">
                <h3 className="font-semibold border-b pb-1">Sample Images</h3>
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
            )} */}

            {/* Order Items */}
            {/* <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Order</h3>
              {selectedUser.orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm my-1">
                  <p>1 × {item.item}</p>
                  <p className="font-semibold">${item.price}</p>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <p>Subtotal</p>
                <p>
                  $
                  {selectedUser.orderItems.reduce(
                    (total, item) => total + item.price,
                    0
                  )}
                </p>
              </div>
            </div> */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActiveUserList;
