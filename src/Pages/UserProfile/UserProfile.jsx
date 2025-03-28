import { ConfigProvider, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import ActiveUserList from "../../Components/PageComponents/ActiveUserList";
const UserProfile = () => {
  const [active, setActive] = useState("active");
  const [email, setEmail] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", email);
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5 mt-4">
        <div className="flex justify-start items-center gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              active === "active"
                ? "bg-primary text-white"
                : "border border-primary"
            }`}
            onClick={() => setActive("active")}
          >
            Active Users
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              active === "delete"
                ? "bg-primary text-white"
                : "border border-primary"
            }`}
            onClick={() => setActive("delete")}
          >
            Delete Users
          </button>
        </div>

        {/* Search Input */}
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

      {/* Render corresponding component based on active state */}
      <div className="mt-4">
        {active === "active" && <ActiveUserList />}
        {active === "delete" && <deletePayments />}
      </div>
    </div>
  );
};

export default UserProfile;
