import { Col } from "antd";
import { FaUsers } from "react-icons/fa";
import { FaDollarSign} from "react-icons/fa6";
// import brandlogo from "../../../assets/image/logo.png";
import ai from "../../../assets/image/ai.png";
const DashbaordAnalytics = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Users */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between ">
              <p className="text-base  ">Active Users</p>
              <p className="rounded-full flex justify-center items-center">
                <FaUsers size={20} className="text-primary" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">24,521</p>
            <p className="text-sm text-green-500">+12.5% this month</p>
          </div>
        </Col>
        {/* Monthly Revenue */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Monthly Revenue</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <FaDollarSign size={20} className="text-primary" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">$45,260</p>
            <p className="text-sm text-green-500">+8.2% this month</p>
          </div>
        </Col>
        {/* Meditation Sessions */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Meditation Sessions</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                {/* <img src={brandlogo} alt="" className="w-6 h-6" /> */}
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">1,243</p>
            <p className="text-sm text-green-500">+18.3% this week</p>
          </div>
        </Col>
        {/* AI Interactions */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">AI Interactions</p>
              <p className="bg-white rounded-full ">
               <img src={ai} className="w-6 h-6" alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">8,432</p>
            <p className="text-sm text-green-500">+15.7% this week</p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default DashbaordAnalytics;
