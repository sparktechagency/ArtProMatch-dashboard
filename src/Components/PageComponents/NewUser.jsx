/* eslint-disable react/prop-types */
import { Avatar, Table } from 'antd';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const NewUser = ({ newUsers = [], isLoading }) => {
  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => <span>{index + 1}.</span>,
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName = 'Unknown', record) => (
        <div className="flex items-center gap-2">
          <Avatar src={getCleanImageUrl(record?.image)}>
            {fullName?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <span>{fullName}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: phone => phone || 'N/A',
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-5">
        <h3 className="text-md md:text-xl font-semibold text-textColor px-2 md:px-0">
          New Users
        </h3>
      </div>
      <div className="bg-white overflow-x-auto">
        <Table
          columns={columns}
          dataSource={(newUsers || []).map(user => ({
            ...user,
            key: user._id,
          }))}
          pagination={false}
          rowKey={record => record._id || record.key}
          loading={isLoading}
          locale={{ emptyText: 'No recent users found' }}
        />
      </div>
    </div>
  );
};

export default NewUser;
