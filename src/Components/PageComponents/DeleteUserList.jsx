/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Space, Table } from "antd";
import { useState } from "react";
import { Button, Modal } from "antd";
import { FaEye, FaUser } from "react-icons/fa";

import { useGetAllClientsQuery } from "../../redux/features/usersApi/usersApi";
const DeleteUserList = () => {
   const { data: clientsData } = useGetAllClientsQuery();
   // console.log("data:", clientsData?.data);
   const userData = clientsData?.data?.filter((user)=>user?.isDeleted);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
            src={record?.profileImage ||<FaUser></FaUser>}
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
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
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
            {/* User Info */}
            <div className="grid grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold text-lg border-b pb-1">
                  User Information
                </h3>
                <p>
                  <strong>Name:</strong> {selectedUser.auth?.fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedUser.auth?.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedUser.auth?.email}
                </p>
                <p>
                  <strong>Latitude:</strong>{" "}
                  {selectedUser.location?.coordinates[1]}
                </p>
                <p>
                  <strong>Longitude:</strong>{" "}
                  {selectedUser.location?.coordinates[0]}
                </p>
                <p>
                  <strong>Radius:</strong> {selectedUser.radius} km
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg border-b pb-1">
                  Preferences
                </h3>
                <p>
                  <strong>Looking For:</strong>{" "}
                  {selectedUser.lookingFor?.length
                    ? selectedUser.lookingFor.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Favorite Tattoos:</strong>{" "}
                  {selectedUser.favoriteTattoos?.length
                    ? selectedUser.favoriteTattoos.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Favorite Piercings:</strong>{" "}
                  {selectedUser.favoritePiercing?.length
                    ? selectedUser.favoritePiercing.join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="border p-4">
              <h3 className="font-semibold text-lg border-b pb-1">
                Other Info
              </h3>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedUser.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedUser.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DeleteUserList;
