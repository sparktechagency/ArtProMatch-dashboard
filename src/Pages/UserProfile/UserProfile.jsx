import { ConfigProvider, Input } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
const UserProfile = () => {
  const [active, setActive] = useState("users");
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
              active === "users"
                ? "bg-primary text-white"
                : "border border-primary"
            }`}
            onClick={() => setActive("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              active === "artist"
                ? "bg-primary text-white"
                : "border border-primary"
            }`}
            onClick={() => setActive("artist")}
          >
            Artist
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              active === "business"
                ? "bg-primary text-white"
                : "border border-primary"
            }`}
            onClick={() => setActive("business")}
          >
            Business
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
        {/* {active === "users" && <UserPayents />}
        {active === "artist" && <ArtistPayments />}
        {active === "business" && <BusinessPayments />} */}
      </div>
    </div>
  );
};

export default UserProfile;
