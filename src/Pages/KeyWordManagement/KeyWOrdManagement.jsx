import { ConfigProvider, Input, message } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FaTrashAlt } from "react-icons/fa";
const KeyWOrdManagement = () => {
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", email);
  };
  const keywords = ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"];
  const handleDelete = () => {
    message.success("Keyword deleted successfully!");
  };
  return (
    <div>
      <div className="flex justify-between items-center  ">
        <button className="bg-primary text-white px-4 py-2 rounded-md">
          Add Keyword
        </button>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  borderRadius: 0,
                  hoverBorderColor: "none",
                  activeBorderColor: "none",
                },
              },
            }}
          >
            <div className="flex gap-2 items-center relative">
              <Input
                placeholder="Search by email"
                allowClear
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onPressEnter={handleSearch}
                prefix={
                  <SearchOutlined
                    style={{ cursor: "pointer" }}
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
      <div className="mt-10 border border-primary rounded-lg p-4">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <h3 className="text-lg font-semibold">{keyword}</h3>
            <button className="">
              <FaTrashAlt
                onClick={handleDelete}
                className="text-red-500 h-5 w-5"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyWOrdManagement;
