import { Avatar, ConfigProvider, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
// import { FiUserCheck } from 'react-icons/fi';
// import { SearchOutlined } from '@ant-design/icons';
import { useGetAllBookingsQuery } from '../../redux/features/adminApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const Bookings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // const [nameInput, setNameInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page,
    limit,
    // name: searchName,
  });

  const meta = data?.meta;

  const bookingRows = data?.data || [];

  const getInitials = name => {
    if (!name) return '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  };

  const formatDate = iso => {
    if (!iso) return '-';
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return '-';
    }
  };

  const statusColor = status => {
    const s = String(status || '').toLowerCase();
    if (s === 'completed') return 'green';
    if (s === 'confirmed') return 'blue';
    if (s === 'pending') return 'orange';
    if (s === 'cancelled') return 'red';
    return 'default';
  };

  const paymentColor = status => {
    const s = String(status || '').toLowerCase();
    if (s === 'succeeded') return 'green';
    if (s === 'authorized') return 'gold';
    if (s === 'failed') return 'red';
    return 'default';
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const showModal = record => {
    setSelectedBooking(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  // const handleSearch = () => {
  //   setPage(1);
  //   setSearchName(nameInput);
  // };

  // const handleSession = record => {
  //   console.log(record);
  // };

  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'slno',
      key: 'slno',
      render: (text, record, index) =>
        (meta?.page ? (meta.page - 1) * limit : 0) + index + 1,
    },
    {
      title: 'Client',
      key: 'client',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md bg-primary"
            src={getCleanImageUrl(record?.clientInfo?.image)}
          >
            {getInitials(record?.clientInfo?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {record?.clientInfo?.fullName || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.clientInfo?.phone || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Artist',
      key: 'artist',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md bg-primary"
            src={getCleanImageUrl(record?.artistInfo?.image)}
          >
            {getInitials(record?.artistInfo?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {record?.artistInfo?.fullName || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.artistInfo?.phone || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: value => (
        <Tag color={paymentColor(value)} className="capitalize">
          {value || '-'}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: value => (
        <Tag color={statusColor(value)} className="capitalize">
          {value || '-'}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: value => (
        <span className="text-gray-600">{formatDate(value)}</span>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBorderColor: 'rgb(47,84,235)',
                defaultHoverColor: 'rgb(47,84,235)',
                defaultBorderColor: 'rgb(47,84,235)',
              },
            },
          }}
        >
          <Space size="middle">
            <Button
              onClick={() => showModal(record)}
              icon={<FaEye className="text-primary" />}
            />

            {/* <Button
              onClick={() => handleSession(record)}
              icon={<FiUserCheck className="h-5 w-5 text-green-500" />}
            /> */}
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Bookings: {meta?.total}
        </h3>
        {/* <div className="mt-4 md:mt-0 flex justify-between items-center gap-2">
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    borderRadius: 0,
                    hoverBorderColor: 'none',
                    activeBorderColor: 'none',
                  },
                },
              }}
            >
              <div className="flex gap-2 items-center relative">
                <Input
                  placeholder="Search by name"
                  allowClear
                  size="large"
                  value={nameInput}
                  onChange={e => {
                    const next = e.target.value;
                    setNameInput(next);
                    if (!next) {
                      setPage(1);
                      setSearchName('');
                    }
                  }}
                  onPressEnter={handleSearch}
                  prefix={
                    <SearchOutlined
                      style={{ cursor: 'pointer' }}
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
        </div> */}
      </div>
      <div className="bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={bookingRows}
          loading={isLoading}
          pagination={{
            current: meta?.page || page,
            pageSize: meta?.limit || limit,
            total: meta?.total || 0,
            showSizeChanger: true,
            onChange: (nextPage, nextPageSize) => {
              setPage(nextPage);
              if (nextPageSize !== limit) {
                setLimit(nextPageSize);
              }
            },
          }}
          rowKey="_id"
        />
        {isError && !isLoading && (
          <div className="p-4 text-red-500 text-sm">
            Failed to load bookings
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedBooking && (
          <div className="p-4">
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                Booking Id: {selectedBooking._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedBooking.createdAt)}
              </p>
            </div>

            {/* User & Delivery Info */}
            <div className="grid grid-cols-2 gap-4 border p-4 my-4">
              {/* User Info */}
              <div>
                <h3 className="font-semibold border-b pb-1">
                  User Information
                </h3>
                <p>
                  <strong>Name:</strong>{' '}
                  {selectedBooking?.clientInfo?.fullName || '-'}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {selectedBooking?.clientInfo?.phone || '-'}
                </p>
                <p>
                  <strong>Artist:</strong>{' '}
                  {selectedBooking?.artistInfo?.fullName || '-'}
                </p>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="font-semibold border-b pb-1">Delivery Info</h3>
                <p>
                  <strong>Service:</strong>{' '}
                  {selectedBooking?.serviceName || '-'}
                </p>
                <p>
                  <strong>Payment:</strong>{' '}
                  <Tag
                    color={paymentColor(selectedBooking?.paymentStatus)}
                    className="capitalize"
                  >
                    {selectedBooking?.paymentStatus || '-'}
                  </Tag>
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Tag
                    color={statusColor(selectedBooking?.status)}
                    className="capitalize"
                  >
                    {selectedBooking?.status || '-'}
                  </Tag>
                </p>
                <p>
                  <strong>Price:</strong>{' '}
                  {typeof selectedBooking?.price === 'number'
                    ? `$${selectedBooking.price}`
                    : '-'}
                </p>
              </div>
            </div>

            {/* Description */}
            {/* <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">
                Description About Tattoo Idea
              </h3>
              <p className="text-gray-600 text-sm">-</p>
            </div> */}

            {/* Sample Images */}
            {/* {selectedBooking.images && selectedBooking.images.length > 0 && (
              <div className="my-4">
                <h3 className="font-semibold border-b pb-1">Sample Images</h3>
                <div className="flex gap-2 mt-2">
                  {selectedBooking.images.map((img, index) => (
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
            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Order</h3>
              <div className="flex justify-between text-sm my-1">
                <p>1 x {selectedBooking?.serviceName || '-'}</p>
                <p className="font-semibold">
                  {typeof selectedBooking?.price === 'number'
                    ? `$${selectedBooking.price}`
                    : '-'}
                </p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-semibold">
                <p>Subtotal</p>
                <p>
                  {typeof selectedBooking?.price === 'number'
                    ? `$${selectedBooking.price}`
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Bookings;
