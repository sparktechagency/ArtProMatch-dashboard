import { ConfigProvider, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
const KeyWOrdManagement = () => {
      const [email, setEmail] = useState("");
    
      const handleSearch = () => {
        console.log("Searching for:", email);
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
    </div>
  );
};

export default KeyWOrdManagement;
