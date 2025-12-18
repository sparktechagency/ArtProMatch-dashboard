import { Avatar, Button, ConfigProvider, Input, Modal, Table, Tag } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useGetAllSecretReviewsQuery } from '../../redux/features/adminApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const ReviewMessages = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [searchTermInput, setSearchTermInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const { data, isLoading, isError } = useGetAllSecretReviewsQuery({
    page,
    limit,
    searchTerm,
  });

  const meta = data?.meta;
  const secretReviewRows = data?.data || [];

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

  const ratingColor = rating => {
    if (typeof rating !== 'number') return 'default';
    if (rating >= 4.5) return 'green';
    if (rating >= 3.5) return 'gold';
    return 'red';
  };

  const paymentColor = status => {
    const s = String(status || '').toLowerCase();
    if (s === 'succeeded') return 'green';
    if (s === 'authorized') return 'gold';
    if (s === 'failed') return 'red';
    return 'default';
  };

  const handleSearch = () => {
    setPage(1);
    setSearchTerm(searchTermInput);
  };

  const showModal = record => {
    setSelectedReview(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const columns = [
    {
      title: 'Sl No',
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
            className="bg-primary shadow-md"
            src={getCleanImageUrl(record?.artistImage)}
          >
            {getInitials(record?.artistFullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{record?.artistFullName || '-'}</span>
            <span className="text-xs text-gray-500">
              {record?.artistEmail || '-'}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'serviceTitle',
      key: 'serviceTitle',
    },
    {
      title: 'Client',
      key: 'client',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">
            {record?.bookingClientFullName || '-'}
          </span>
          <span className="text-xs text-gray-500">
            {record?.bookingClientEmail || '-'}
          </span>
          <span className="text-xs text-gray-500">
            {record?.bookingClientPhone || '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'bookingPaymentStatus',
      key: 'bookingPaymentStatus',
      render: value => (
        <Tag color={paymentColor(value)} className="capitalize">
          {value || '-'}
        </Tag>
      ),
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: value => (
        <span className="text-gray-600">{formatDate(value)}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'servicePrice',
      key: 'servicePrice',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Rating',
      dataIndex: 'serviceAvgRating',
      key: 'serviceAvgRating',
      render: value => (
        <Tag color={ratingColor(value)}>
          {typeof value === 'number' ? value : '-'}
        </Tag>
      ),
    },
    {
      title: 'Total Reviews',
      dataIndex: 'serviceTotalReviewCount',
      key: 'serviceTotalReviewCount',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Completed Orders',
      dataIndex: 'serviceTotalCompletedOrder',
      key: 'serviceTotalCompletedOrder',
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
      title: 'Message',
      dataIndex: 'description',
      key: 'description',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="default" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          All Reviews: {meta?.total}
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

      <div className="flex justify-end items-center gap-5 mt-4">
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
                placeholder="Search"
                allowClear
                size="large"
                value={searchTermInput}
                onChange={e => {
                  const next = e.target.value;
                  setSearchTermInput(next);
                  if (!next) {
                    setPage(1);
                    setSearchTerm('');
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
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-r-lg"
              >
                Search
              </button>
            </div>
          </ConfigProvider>
        </div>
      </div>

      <div className="mt-4 bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={secretReviewRows}
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
            Failed to load secret reviews
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {selectedReview && (
          <div className="p-2">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                Secret Review Id: {selectedReview?._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedReview?.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold border-b pb-1">Artist</h3>
                <p>
                  <strong>Name:</strong> {selectedReview?.artistFullName || '-'}
                </p>
                <p>
                  <strong>Email:</strong> {selectedReview?.artistEmail || '-'}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedReview?.artistPhone || '-'}
                </p>
                <p>
                  <strong>Type:</strong> {selectedReview?.artistType || '-'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold border-b pb-1">Service</h3>
                <div className="flex gap-4 mt-3">
                  <div className="w-28 h-28 border rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                    {selectedReview?.serviceThumbnail ? (
                      <img
                        src={getCleanImageUrl(selectedReview.serviceThumbnail)}
                        alt="Service"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs">No image</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {selectedReview?.serviceTitle || '-'}
                    </p>

                    <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 text-sm">
                      <p className="text-gray-700">
                        <strong>Price:</strong>{' '}
                        {typeof selectedReview?.servicePrice === 'number'
                          ? `$${selectedReview.servicePrice}`
                          : '-'}
                      </p>

                      <p className="text-gray-700">
                        <strong>Avg Rating:</strong>{' '}
                        <Tag
                          color={ratingColor(selectedReview?.serviceAvgRating)}
                        >
                          {typeof selectedReview?.serviceAvgRating === 'number'
                            ? selectedReview.serviceAvgRating
                            : '-'}
                        </Tag>
                      </p>

                      <p className="text-gray-700">
                        <strong>Total Reviews:</strong>{' '}
                        {typeof selectedReview?.serviceTotalReviewCount ===
                        'number'
                          ? selectedReview.serviceTotalReviewCount
                          : '-'}
                      </p>

                      <p className="text-gray-700">
                        <strong>Completed Orders:</strong>{' '}
                        {typeof selectedReview?.serviceTotalCompletedOrder ===
                        'number'
                          ? selectedReview.serviceTotalCompletedOrder
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Message</h3>
              <p className="text-gray-700 text-sm">
                {selectedReview?.description || '-'}
              </p>
            </div>

            {(selectedReview?.bookingDate ||
              selectedReview?.bookingBodyPart ||
              selectedReview?.bookingPaymentStatus ||
              selectedReview?.bookingReview ||
              selectedReview?.bookingClientFullName ||
              selectedReview?.bookingClientEmail ||
              selectedReview?.bookingClientPhone) && (
              <div className="border p-3 my-4">
                <h3 className="font-semibold border-b pb-1">Booking Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-gray-700">
                      <strong>Booking Date:</strong>{' '}
                      {formatDate(selectedReview?.bookingDate)}
                    </p>
                    <p className="text-gray-700">
                      <strong>Body Part:</strong>{' '}
                      {selectedReview?.bookingBodyPart || '-'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Payment Status:</strong>{' '}
                      <Tag
                        color={paymentColor(
                          selectedReview?.bookingPaymentStatus
                        )}
                        className="capitalize"
                      >
                        {selectedReview?.bookingPaymentStatus || '-'}
                      </Tag>
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-700">
                      <strong>Client Name:</strong>{' '}
                      {selectedReview?.bookingClientFullName || '-'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Client Email:</strong>{' '}
                      {selectedReview?.bookingClientEmail || '-'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Client Phone:</strong>{' '}
                      {selectedReview?.bookingClientPhone || '-'}
                    </p>
                  </div>
                </div>

                {selectedReview?.bookingReview && (
                  <div className="mt-3">
                    <p className="text-gray-700">
                      <strong>Booking Review:</strong>
                    </p>
                    <p className="text-gray-700 text-sm mt-1">
                      {selectedReview.bookingReview}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(selectedReview?.artistExpertise) &&
                selectedReview.artistExpertise.length > 0 ? (
                  selectedReview.artistExpertise.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))
                ) : (
                  <span className="text-gray-600 text-sm">-</span>
                )}
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Location</h3>
              <p className="text-gray-700 text-sm">
                {selectedReview?.artistStringLocation || '-'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewMessages;
