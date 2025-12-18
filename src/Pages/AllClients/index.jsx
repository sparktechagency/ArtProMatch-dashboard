import { Avatar, ConfigProvider, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaEye } from 'react-icons/fa';
// import { SearchOutlined } from '@ant-design/icons';
import { useGetAllClientsQuery } from '../../redux/features/usersApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const AllClients = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  // const [nameInput, setNameInput] = useState('');
  // const [searchName, setSearchName] = useState('');

  const { data, isLoading, isError } = useGetAllClientsQuery({
    page,
    limit,
    // name: searchName,
  });

  const meta = data?.meta;
  const clientRows = data?.data || [];

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
  const [selectedClient, setSelectedClient] = useState(null);

  const showModal = record => {
    setSelectedClient(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
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
      title: 'Location',
      dataIndex: 'stringLocation',
      key: 'stringLocation',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
    },
    {
      title: 'Radius',
      dataIndex: 'radius',
      key: 'radius',
      render: value => (typeof value === 'number' ? value : '-'),
    },
    {
      title: 'Looking For',
      dataIndex: 'lookingFor',
      key: 'lookingFor',
      render: value => renderListTags(value),
    },
    {
      title: 'Favorite Tattoos',
      dataIndex: 'favoriteTattoos',
      key: 'favoriteTattoos',
      render: value => renderListTags(value),
    },
    {
      title: 'Preferred Artist Type',
      dataIndex: 'preferredArtistType',
      key: 'preferredArtistType',
      render: value => <span className="text-gray-700">{value || '-'}</span>,
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
          All Clients: {meta?.total}
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
          dataSource={clientRows}
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
          <div className="p-4 text-red-500 text-sm">Failed to load clients</div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedClient && (
          <div className="p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">
                Client Id: {selectedClient._id}
              </h2>
              <p className="text-gray-600 text-sm">
                {formatDate(selectedClient.createdAt)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 my-4">
              <div>
                <h3 className="font-semibold border-b pb-1">
                  Client Information
                </h3>
                <p>
                  <strong>Name:</strong> {selectedClient?.auth?.fullName || '-'}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {selectedClient?.auth?.phoneNumber || '-'}
                </p>
                <p>
                  <strong>Email:</strong> {selectedClient?.auth?.email || '-'}
                </p>
              </div>

              <div>
                <h3 className="font-semibold border-b pb-1">Preferences</h3>
                <p>
                  <strong>Home View:</strong> {selectedClient?.homeView || '-'}
                </p>
                <p>
                  <strong>Preferred Artist Type:</strong>{' '}
                  {selectedClient?.preferredArtistType || '-'}
                </p>
                <p>
                  <strong>Radius:</strong>{' '}
                  {typeof selectedClient?.radius === 'number'
                    ? selectedClient.radius
                    : '-'}
                </p>
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Location</h3>
              <p className="text-gray-700 text-sm">
                {selectedClient?.stringLocation || '-'}
              </p>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Looking For</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(selectedClient?.lookingFor) &&
                selectedClient.lookingFor.length > 0 ? (
                  selectedClient.lookingFor.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))
                ) : (
                  <span className="text-gray-600 text-sm">-</span>
                )}
              </div>
            </div>

            <div className="border p-3 my-4">
              <h3 className="font-semibold border-b pb-1">Favorite Tattoos</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(selectedClient?.favoriteTattoos) &&
                selectedClient.favoriteTattoos.length > 0 ? (
                  selectedClient.favoriteTattoos.map(item => (
                    <Tag key={item}>{item}</Tag>
                  ))
                ) : (
                  <span className="text-gray-600 text-sm">-</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AllClients;
