import { Avatar, ConfigProvider, Space, Table } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
// import { FiUserCheck } from 'react-icons/fi';
// import { SearchOutlined } from '@ant-design/icons';
import { useGetAllServicesQuery } from '../../redux/features/adminApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const Services = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // const [nameInput, setNameInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  const { data, isLoading, isError } = useGetAllServicesQuery({
    page,
    limit,
    // name: searchName,
  });

  const meta = data?.meta;

  const serviceRows = data?.data || [];

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const showModal = record => {
    setSelectedService(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
      title: 'Artist',
      key: 'artist',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md bg-primary"
            src={getCleanImageUrl(record?.artist?.image)}
          >
            {getInitials(record?.artist?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {record?.artist?.fullName || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.artist?.email || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.artist?.phoneNumber || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Service',
      key: 'service',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            size={40}
            className="shadow-md bg-primary"
            src={getCleanImageUrl(record?.thumbnail)}
          >
            {getInitials(record?.title)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{record?.title || '-'}</span>
            <span className="text-xs text-gray-500">
              {record?.sessionType || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Body Location',
      dataIndex: 'bodyLocation',
      key: 'bodyLocation',
      render: value => <span className="capitalize">{value || '-'}</span>,
    },
    {
      title: 'Session',
      dataIndex: 'sessionType',
      key: 'sessionType',
      render: value => <span className="capitalize">{value || '-'}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Rating',
      dataIndex: 'avgRating',
      key: 'avgRating',
      render: value => (typeof value === 'number' ? value.toFixed(1) : '-'),
    },
    {
      title: 'Reviews',
      dataIndex: 'totalReviewCount',
      key: 'totalReviewCount',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Completed',
      dataIndex: 'totalCompletedOrder',
      key: 'totalCompletedOrder',
      render: value => (typeof value === 'number' ? value : '-'),
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
          Services: {meta?.total}
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
          dataSource={serviceRows}
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
            Failed to load services
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedService && (
          <div className="p-4">
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                Service Id: {selectedService._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedService.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold border-b pb-1">Service Info</h3>
                <p>
                  <strong>Title:</strong> {selectedService?.title || '-'}
                </p>
                <p>
                  <strong>Session:</strong>{' '}
                  <span className="capitalize">
                    {selectedService?.sessionType || '-'}
                  </span>
                </p>
                <p>
                  <strong>Body Location:</strong>{' '}
                  <span className="capitalize">
                    {selectedService?.bodyLocation || '-'}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-semibold border-b pb-1">Stats</h3>
                <p>
                  <strong>Price:</strong>{' '}
                  {typeof selectedService?.price === 'number'
                    ? `$${selectedService.price}`
                    : '-'}
                </p>
                <p>
                  <strong>Rating:</strong>{' '}
                  {typeof selectedService?.avgRating === 'number'
                    ? selectedService.avgRating.toFixed(1)
                    : '-'}
                </p>
                <p>
                  <strong>Total Reviews:</strong>{' '}
                  {typeof selectedService?.totalReviewCount === 'number'
                    ? selectedService.totalReviewCount
                    : '-'}
                </p>
                <p>
                  <strong>Completed Orders:</strong>{' '}
                  {typeof selectedService?.totalCompletedOrder === 'number'
                    ? selectedService.totalCompletedOrder
                    : '-'}
                </p>
              </div>
            </div>

            <div className="border p-4 my-4">
              <h3 className="font-semibold border-b pb-1">
                Artist {`( Id: ${selectedService?.artist?._id} )`}
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <Avatar
                  size={48}
                  className="shadow-md bg-primary"
                  src={getCleanImageUrl(selectedService?.artist?.image)}
                >
                  {getInitials(selectedService?.artist?.fullName)}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {selectedService?.artist?.fullName || '-'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedService?.artist?.email || '-'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedService?.artist?.phoneNumber || '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Description</h3>
              <p className="text-gray-600 text-sm whitespace-pre-line">
                {selectedService?.description || '-'}
              </p>
            </div>

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

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Thumbnail</h3>
              <div className="mt-2">
                <img
                  src={getCleanImageUrl(selectedService?.thumbnail)}
                  alt={selectedService?.title || 'Service thumbnail'}
                  className="w-full max-h-72 object-contain border"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Services;
