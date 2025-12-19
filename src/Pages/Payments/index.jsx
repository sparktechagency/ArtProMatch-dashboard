import { useState } from 'react';
import { Avatar, Table, Tag } from 'antd';
import PaymentsCards from '../../Components/PageComponents/PaymentsCards';
import { useGetAllPaymentHistoriesQuery } from '../../redux/features/adminApis';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const Payments = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const { data, isLoading, isError } = useGetAllPaymentHistoriesQuery({
    page,
    limit,
  });

  const meta = data?.meta;
  const paymentHistoryRows = data?.data || [];

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

  const columns = [
    {
      title: 'Sl No',
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
            className="bg-primary"
            size={36}
            src={getCleanImageUrl(record?.clientInfo?.image)}
          >
            {getInitials(record?.clientInfo?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {record?.clientInfo?.fullName || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.clientInfo?.email || '-'}
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
            className="bg-primary"
            size={36}
            src={getCleanImageUrl(record?.artistInfo?.image)}
          >
            {getInitials(record?.artistInfo?.fullName)}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">
              {record?.artistInfo?.fullName || '-'}
            </span>
            <span className="text-xs text-gray-500">
              {record?.artistInfo?.email || '-'}
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
      title: 'Stripe Fee',
      dataIndex: 'stripeFee',
      key: 'stripeFee',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Earning',
      dataIndex: 'platFormFee',
      key: 'platFormFee',
      render: value => (typeof value === 'number' ? `$${value}` : '-'),
    },
    {
      title: 'Artist Earning',
      dataIndex: 'artistEarning',
      key: 'artistEarning',
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
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-textColor px-2 md:px-0">
          Payments: {meta?.total}
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
      <PaymentsCards paymentHistoryRows={paymentHistoryRows} />

      <div className="mt-4 bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paymentHistoryRows}
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
            Failed to load payment histories
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
