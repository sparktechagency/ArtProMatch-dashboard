/* eslint-disable react/no-unescaped-entities */
import user from '../../../assets/image/user.png';
import Search from 'antd/es/transfer/search';
import { SearchOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';

const LeftSidebar = () => {
  const onSearch = value => {
    console.log('Search input: ', value);
  };

  return (
    <div className="  ">
      <div className="flex justify-start items-center gap-3 p-5">
        <img src={user} alt="" />
        <p className="font-semibold">Admin Talia</p>
      </div>
      <div className="my-4 px-5">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                borderRadius: 0,
              },
            },
          }}
        >
          <Search
            placeholder="Search "
            allowClear
            enterButton="Search"
            size="large"
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />
        </ConfigProvider>
      </div>
      <div className="">
        <div className="flex justify-between items-center text-textColor mb-5 px-5 py-1 bg-[#f9deda] ">
          <div className="flex justify-start items-center gap-2">
            <img src={user} alt="" />
            <div>
              <h3 className="text-xl font-semibold ">Talia</h3>
              <p className="">Don't text</p>
            </div>
          </div>
          <div>
            {' '}
            <p>6 miniutes ago</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-textColor mb-5 px-5">
          <div className="flex justify-start items-center gap-2">
            <img src={user} alt="" />
            <div>
              <h3 className="text-xl font-semibold ">Aalia</h3>
              <p className="">Don't text</p>
            </div>
          </div>
          <div>
            {' '}
            <p>6 miniutes ago</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-textColor mb-5 px-5">
          <div className="flex justify-start items-center gap-2">
            <img src={user} alt="" />
            <div>
              <h3 className="text-xl font-semibold ">Dalia</h3>
              <p className="">Don't text</p>
            </div>
          </div>
          <div>
            {' '}
            <p>6 miniutes ago</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-textColor mb-5 px-5">
          <div className="flex justify-start items-center gap-2">
            <img src={user} alt="" />
            <div>
              <h3 className="text-xl font-semibold ">Halia</h3>
              <p className="">Don't text</p>
            </div>
          </div>
          <div>
            {' '}
            <p>6 miniutes ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
