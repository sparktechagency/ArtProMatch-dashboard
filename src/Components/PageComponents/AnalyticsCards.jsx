import { Col } from "antd";

import img1 from "../../assets/image/User 2.png";
import img2 from "../../assets/image/Artist 2.png";
import img3 from "../../assets/image/Business 2.png";
import img4 from "../../assets/image/Easning 2.png";
// import brandlogo from "../../../assets/image/Logo.png";
// import ai from "../../../assets/image/ai.png";
const AnalyticsCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Users */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between ">
              <p className="text-base  ">Total client</p>
              <p className="rounded-full flex justify-center items-center">
                <img src={img1} alt="" />
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
              <p className="text-base  ">Artist</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <img src={img2} alt="" />
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
              <p className="text-base  ">Business</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <img src={img3} alt="" />
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
              <p className="text-base  ">Earning</p>
              <p className="bg-white rounded-full ">
                <img src={img4} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">$8,432</p>
            <p className="text-sm text-green-500">+15.7% this week</p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default AnalyticsCards;
