import { Col } from "antd";

import img1 from "../../assets/image/Vector.png";
import img2 from "../../assets/image/Group.png";
import img3 from "../../assets/image/Comple 2.png";
import img4 from "../../assets/image/Withdraw 2.png";

const PaymentsCards = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Users */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between ">
              <p className="text-base  ">Pending</p>
              <p className="rounded-full flex justify-center items-center">
                <img src={img1} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">24,521</p>
          </div>
        </Col>
        {/* Monthly Revenue */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Total Earning</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <img src={img2} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">$45,260</p>
          </div>
        </Col>
        {/* Meditation Sessions */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Complete Order</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <img src={img3} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">1,243</p>
          </div>
        </Col>
        {/* AI Interactions */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Withdraw</p>
              <p className="bg-white rounded-full ">
                <img src={img4} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">$8,432</p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default PaymentsCards;
