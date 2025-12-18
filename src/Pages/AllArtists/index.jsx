import { Avatar, ConfigProvider, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
// import { SearchOutlined } from '@ant-design/icons';
import {
  useApproveArtistMutation,
  useGetAllArtistsQuery,
} from '../../redux/features/usersApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const AllArtists = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // const [nameInput, setNameInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  const { data, isLoading, isError, refetch } = useGetAllArtistsQuery({
    page,
    limit,
    // name: searchName,
  });

  const [approveArtist] = useApproveArtistMutation();
  const [approvingId, setApprovingId] = useState(null);

  const meta = data?.meta;
  const artistRows = data?.data || [];

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
  const [selectedArtist, setSelectedArtist] = useState(null);

  const showModal = record => {
    setSelectedArtist(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedArtist(null);
  };

  // const handleSearch = () => {
  //   setPage(1);
  //   setSearchName(nameInput);
  // };

  const renderListTags = (items, max = 3) => {
    if (!Array.isArray(items) || items.length === 0) return '-';
    const visible = items.slice(0, max);
    const remaining = items.length - visible.length;
    return (
      <div className="flex flex-wrap gap-1">
        {visible.map(item => (
          <Tag key={item}>{item}</Tag>
        ))}
        {remaining > 0 && <Tag>+{remaining}</Tag>}
      </div>
    );
  };

  const boolTag = value => (
    <Tag color={value ? 'green' : 'red'} className="capitalize">
      {value ? 'Yes' : 'No'}
    </Tag>
  );

  const ratingTag = value => (
    <Tag color={typeof value === 'number' && value >= 4.5 ? 'green' : 'gold'}>
      {typeof value === 'number' ? value.toFixed(2) : '-'}
    </Tag>
  );

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
            src={getCleanImageUrl(record?.auth?.image)}
          >
            {getInitials(record?.auth?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{record?.auth?.fullName || '-'}</span>
            <span className="text-xs text-gray-500">
              {record?.auth?.email || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.auth?.phoneNumber || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Expertise',
      dataIndex: 'expertise',
      key: 'expertise',
      render: value => renderListTags(value),
    },
    {
      title: 'Hourly Rate',
      dataIndex: 'hourlyRate',
      key: 'hourlyRate',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Stripe Ready',
      dataIndex: 'isStripeReady',
      key: 'isStripeReady',
      render: value => boolTag(Boolean(value)),
    },
    {
      title: 'Avg Rating',
      dataIndex: 'avgRating',
      key: 'avgRating',
      render: value => ratingTag(value),
    },
    {
      title: 'Reviews',
      dataIndex: 'totalReviewCount',
      key: 'totalReviewCount',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Completed',
      dataIndex: 'totalCompletedService',
      key: 'totalCompletedService',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Location',
      dataIndex: 'stringLocation',
      key: 'stringLocation',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Connected Business',
      dataIndex: 'isConnBusiness',
      key: 'isConnBusiness',
      render: value => boolTag(Boolean(value)),
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

            {!record?.auth?.isActive && (
              <Button
                type="primary"
                loading={approvingId === record?._id}
                disabled={approvingId === record?._id}
                onClick={() => {
                  Modal.confirm({
                    title: 'Approve this artist?',
                    content: (
                      <div className="flex items-center gap-3">
                        <Avatar
                          size={44}
                          className="shadow-md bg-primary"
                          src={getCleanImageUrl(record?.auth?.image)}
                        >
                          {getInitials(record?.auth?.fullName)}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {record?.auth?.fullName || '-'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {record?.auth?.email || '-'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {record?.auth?.phoneNumber || '-'}
                          </span>
                        </div>
                      </div>
                    ),
                    okText: 'Approve',
                    cancelText: 'Cancel',
                    onOk: async () => {
                      setApprovingId(record?._id);
                      try {
                        await approveArtist({ _id: record?._id }).unwrap();
                        await refetch();
                      } finally {
                        setApprovingId(null);
                      }
                    },
                  });
                }}
              >
                Approve
              </Button>
            )}

            {record?.auth?.isActive && (
              <Button
                danger
                loading={approvingId === record?._id}
                disabled={approvingId === record?._id}
                onClick={() => {
                  Modal.confirm({
                    title: 'Unapprove this artist?',
                    content: (
                      <div className="flex items-center gap-3">
                        <Avatar
                          size={44}
                          className="shadow-md bg-primary"
                          src={getCleanImageUrl(record?.auth?.image)}
                        >
                          {getInitials(record?.auth?.fullName)}
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {record?.auth?.fullName || '-'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {record?.auth?.email || '-'}
                          </span>
                          <span className="text-sm text-gray-600">
                            {record?.auth?.phoneNumber || '-'}
                          </span>
                        </div>
                      </div>
                    ),
                    okText: 'Unapprove',
                    cancelText: 'Cancel',
                    onOk: async () => {
                      setApprovingId(record?._id);
                      try {
                        await approveArtist({ _id: record?._id }).unwrap();
                        await refetch();
                      } finally {
                        setApprovingId(null);
                      }
                    },
                  });
                }}
              >
                Unapprove
              </Button>
            )}
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          All Artists: {meta?.total}
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
          dataSource={artistRows}
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
          <div className="p-4 text-red-500 text-sm">Failed to load artists</div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {selectedArtist && (
          <div className="p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                Artist Id: {selectedArtist._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedArtist.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold border-b pb-1">
                  Artist Information
                </h3>
                <p>
                  <strong>Name:</strong> {selectedArtist?.auth?.fullName || '-'}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {selectedArtist?.auth?.phoneNumber || '-'}
                </p>
                <p>
                  <strong>Email:</strong> {selectedArtist?.auth?.email || '-'}
                </p>
                <p>
                  <strong>Type:</strong> {selectedArtist?.type || '-'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold border-b pb-1">Stats</h3>
                <p>
                  <strong>Hourly Rate:</strong>{' '}
                  {typeof selectedArtist?.hourlyRate === 'number'
                    ? `$${selectedArtist.hourlyRate}`
                    : '-'}
                </p>
                <p>
                  <strong>Stripe Ready:</strong>{' '}
                  {boolTag(Boolean(selectedArtist?.isStripeReady))}
                </p>
                <p>
                  <strong>Stripe Account:</strong>{' '}
                  {selectedArtist?.stripeAccountId || '-'}
                </p>
                <p>
                  <strong>Avg Rating:</strong>{' '}
                  {ratingTag(selectedArtist?.avgRating)}
                </p>
                <p>
                  <strong>Total Reviews:</strong>{' '}
                  {typeof selectedArtist?.totalReviewCount === 'number'
                    ? selectedArtist.totalReviewCount
                    : '-'}
                </p>
                <p>
                  <strong>Total Completed:</strong>{' '}
                  {typeof selectedArtist?.totalCompletedService === 'number'
                    ? selectedArtist.totalCompletedService
                    : '-'}
                </p>
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Location</h3>
              <p className="text-gray-700 text-sm">
                {selectedArtist?.stringLocation || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(selectedArtist?.expertise) &&
                selectedArtist.expertise.length > 0 ? (
                  selectedArtist.expertise.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))
                ) : (
                  <span className="text-gray-600 text-sm">-</span>
                )}
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Business</h3>
              <p className="text-gray-700 text-sm">
                <strong>Connected:</strong>{' '}
                {boolTag(Boolean(selectedArtist?.isConnBusiness))}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Business Id:</strong> {selectedArtist?.business || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Description</h3>
              <p className="text-gray-700 text-sm">
                {selectedArtist?.description || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Boost</h3>
              <p className="text-gray-700 text-sm">
                <strong>Active:</strong>{' '}
                {boolTag(Boolean(selectedArtist?.boost?.isActive))}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Last Boost At:</strong>{' '}
                {selectedArtist?.boost?.lastBoostAt
                  ? formatDate(selectedArtist.boost.lastBoostAt)
                  : '-'}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>End Time:</strong>{' '}
                {selectedArtist?.boost?.endTime
                  ? formatDate(selectedArtist.boost.endTime)
                  : '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">
                Verification Files
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">
                    ID Front
                  </p>
                  {selectedArtist?.idCardFront ? (
                    <img
                      src={getCleanImageUrl(selectedArtist.idCardFront)}
                      alt="ID Front"
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-2">-</p>
                  )}
                </div>

                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">ID Back</p>
                  {selectedArtist?.idCardBack ? (
                    <img
                      src={getCleanImageUrl(selectedArtist.idCardBack)}
                      alt="ID Back"
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-2">-</p>
                  )}
                </div>

                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">
                    Selfie With ID
                  </p>
                  {selectedArtist?.selfieWithId ? (
                    <img
                      src={getCleanImageUrl(selectedArtist.selfieWithId)}
                      alt="Selfie With ID"
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-2">-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllArtists;
