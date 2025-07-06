/* eslint-disable no-unused-vars */
import { Avatar, ConfigProvider, Space, Table } from "antd";
import { useState } from "react";
import { Button, Modal } from "antd";

import { useApproveArtistMutation, useGetAllArtistQuery } from "../../redux/features/usersApi/usersApi";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utils/baseUrl";
const DeleteArtist = () => {
const { data: artistData } = useGetAllArtistQuery();
 const { data: approveArtist } = useApproveArtistMutation();
  const userData = artistData?.data?.filter(
    (artist) => artist.isDeleted === true
  );

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
 const handleApprove = async (_id) => {
    try {
      const res = await approveArtist({ _id }).unwrap();
      if (res.success) {
        Swal.fire({
          title: "Artist Profile is Approved.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Approval failed:", error);
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
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
          <span>{record?.auth.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span>{record?.auth.email}</span>
        </div>
      ),
    },
    {
      title: "Contact No",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <span>{record?.auth.phoneNumber}</span>
        </div>
      ),
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
            <Button onClick={() => handleApprove(record._id)}>Approve</Button>
            <Button>Delete</Button>
            <Button onClick={() => showModal(record)}>View</Button>
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
  <div className="p-4 space-y-6">
    {/* User Info */}
    <div className="grid grid-cols-2 gap-4 border p-4">
      <div>
        <h3 className="font-bold text-lg border-b pb-1">User Information</h3>
        <p><strong>Name:</strong> {selectedUser.auth?.fullName}</p>
        <p><strong>Phone:</strong> {selectedUser.auth?.phoneNumber}</p>
        <p><strong>Email:</strong> {selectedUser.auth?.email}</p>
        <p><strong>City:</strong> {selectedUser.city?.replace(/"/g, "")}</p>
      </div>
      <div>
        <h3 className="font-bold text-lg border-b pb-1">Profile Status</h3>
        <p><strong>Type:</strong> {selectedUser.type}</p>
        <p><strong>Expertise:</strong> {selectedUser.expertise?.join(", ")}</p>
        <p><strong>Active:</strong> {selectedUser.isActive ? "Yes" : "No"}</p>
        <p><strong>Verified:</strong> {selectedUser.isVerified ? "Yes" : "No"}</p>
        <p><strong>Deleted:</strong> {selectedUser.isDeleted ? "Yes" : "No"}</p>
      </div>
    </div>

    {/* Location */}
    <div className="border p-4">
      <h3 className="font-bold text-lg border-b pb-1">Location Coordinates</h3>
      <p><strong>Latitude:</strong> {selectedUser.location?.coordinates[1]}</p>
      <p><strong>Longitude:</strong> {selectedUser.location?.coordinates[0]}</p>
    </div>

    {/* Uploaded Documents */}
    <div className="border p-4">
      <h3 className="font-bold text-lg border-b pb-1">Uploaded Documents</h3>
      <div className="flex gap-4 flex-wrap mt-2">
        <div>
          <p className="font-semibold">ID Card Front:</p>
          <img
            src={`${BASE_URL}/${selectedUser.idCardFront?.replace(/\\/g, "/")}`}
            alt="ID Front"
            className="w-32 h-32 object-cover border"
          />
        </div>
        <div>
          <p className="font-semibold">ID Card Back:</p>
          <img
            src={`${BASE_URL}/${selectedUser.idCardBack?.replace(/\\/g, "/")}`}
            alt="ID Back"
            className="w-32 h-32 object-cover border"
          />
        </div>
        <div>
          <p className="font-semibold">Selfie with ID:</p>
          <img
            src={`${BASE_URL}/${selectedUser.selfieWithId?.replace(/\\/g, "/")}`}
            alt="Selfie"
            className="w-32 h-32 object-cover border"
          />
        </div>
      </div>
    </div>

    {/* Additional Metadata */}
    <div className="border p-4">
      <h3 className="font-bold text-lg border-b pb-1">Other Info</h3>
      <p><strong>Profile Views:</strong> {selectedUser.profileViews}</p>
      <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
    </div>
  </div>
)}

      </Modal>
    </div>
  );
};

export default DeleteArtist;
