import { Avatar, ConfigProvider, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
// import { SearchOutlined } from '@ant-design/icons';
import { useGetAllBusinessesQuery } from '../../redux/features/usersApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const AllBusinesses = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // const [nameInput, setNameInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  const { data, isLoading, isError } = useGetAllBusinessesQuery({
    page,
    limit,
    // name: searchName,
  });

  const meta = data?.meta;
  const businessRows = data?.data || [];

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

  const renderOperatingHours = operatingHours => {
    if (!operatingHours || typeof operatingHours !== 'object') return '-';
    const entries = Object.entries(operatingHours);
    if (entries.length === 0) return '-';

    return (
      <div className="space-y-2">
        {entries.map(([day, slots]) => (
          <div key={day} className="flex items-start gap-3">
            <span className="w-24 text-sm font-semibold text-gray-700">
              {day}
            </span>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(slots) && slots.length > 0 ? (
                slots.map((s, idx) => (
                  <Tag key={`${day}-${idx}`}>
                    {s?.start || '--:--'} - {s?.end || '--:--'}
                  </Tag>
                ))
              ) : (
                <span className="text-sm text-gray-600">Closed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'slno',
      key: 'slno',
      render: (text, record, index) =>
        (meta?.page ? (meta.page - 1) * limit : 0) + index + 1,
    },
    {
      title: 'Owner',
      key: 'owner',
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
      title: 'Studio Name',
      dataIndex: 'studioName',
      key: 'studioName',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Business Type',
      dataIndex: 'businessType',
      key: 'businessType',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Services Offered',
      dataIndex: 'servicesOffered',
      key: 'servicesOffered',
      render: value => renderListTags(value, 5),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="text-xs text-gray-700">
            {record?.contact?.email || record?.auth?.email || '-'}
          </span>
          <span className="text-xs text-gray-500">
            {record?.contact?.phone || record?.auth?.phoneNumber || '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'Task Completed',
      dataIndex: 'taskCompleted',
      key: 'taskCompleted',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Location',
      dataIndex: 'stringLocation',
      key: 'stringLocation',
      render: value => (
        <span className="text-gray-700 line-clamp-2">{value || '-'}</span>
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
          </Space>
        </ConfigProvider>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          All Businesses: {meta?.total}
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
          dataSource={businessRows}
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
            Failed to load businesses
          </div>
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
                Business Id: {selectedArtist._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedArtist.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold border-b pb-1">Owner</h3>
                <p>
                  <strong>Name:</strong> {selectedArtist?.auth?.fullName || '-'}
                </p>
                <p>
                  <strong>Email:</strong> {selectedArtist?.auth?.email || '-'}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {selectedArtist?.auth?.phoneNumber || '-'}
                </p>
                <p>
                  <strong>Profile Complete:</strong>{' '}
                  {selectedArtist?.auth?.isProfile ? 'Yes' : 'No'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold border-b pb-1">Business</h3>
                <p>
                  <strong>Studio Name:</strong>{' '}
                  {selectedArtist?.studioName || '-'}
                </p>
                <p>
                  <strong>Business Type:</strong>{' '}
                  {selectedArtist?.businessType || '-'}
                </p>
                <p>
                  <strong>Task Completed:</strong>{' '}
                  {typeof selectedArtist?.taskCompleted === 'number'
                    ? selectedArtist.taskCompleted
                    : '-'}
                </p>
                <p>
                  <strong>City:</strong> {selectedArtist?.city || '-'}
                </p>
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Location</h3>
              <p className="text-gray-700 text-sm">
                {selectedArtist?.stringLocation || '-'}
              </p>
              {Array.isArray(selectedArtist?.location?.coordinates) &&
                selectedArtist.location.coordinates.length === 2 && (
                  <p className="text-gray-600 text-xs mt-1">
                    Lat/Lng: {selectedArtist.location.coordinates[1]},{' '}
                    {selectedArtist.location.coordinates[0]}
                  </p>
                )}
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Services Offered</h3>
              {Array.isArray(selectedArtist?.servicesOffered) &&
              selectedArtist.servicesOffered.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedArtist.servicesOffered.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm mt-2">-</p>
              )}
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Contact</h3>
              <p className="text-gray-700 text-sm">
                <strong>Email:</strong>{' '}
                {selectedArtist?.contact?.email ||
                  selectedArtist?.auth?.email ||
                  '-'}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Phone:</strong>{' '}
                {selectedArtist?.contact?.phone ||
                  selectedArtist?.auth?.phoneNumber ||
                  '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Operating Hours</h3>
              <div className="mt-2">
                {renderOperatingHours(selectedArtist?.operatingHours)}
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">
                    Registration Certificate
                  </p>
                  {selectedArtist?.registrationCertificate ? (
                    <img
                      src={getCleanImageUrl(
                        selectedArtist.registrationCertificate
                      )}
                      alt="Registration Certificate"
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-2">-</p>
                  )}
                </div>

                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">
                    Tax ID / Equivalent
                  </p>
                  {selectedArtist?.taxIdOrEquivalent ? (
                    <img
                      src={getCleanImageUrl(selectedArtist.taxIdOrEquivalent)}
                      alt="Tax ID"
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  ) : (
                    <p className="text-gray-600 text-sm mt-2">-</p>
                  )}
                </div>

                <div className="border rounded p-2">
                  <p className="text-gray-700 text-sm font-semibold">
                    Studio License
                  </p>
                  {selectedArtist?.studioLicense ? (
                    <img
                      src={getCleanImageUrl(selectedArtist.studioLicense)}
                      alt="Studio License"
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

export default AllBusinesses;
