/* eslint-disable react/prop-types */
import { Col } from 'antd';
import img1 from '../../assets/image/Vector.png';
import img2 from '../../assets/image/Group.png';
import img3 from '../../assets/image/Comple 2.png';
import img4 from '../../assets/image/Withdraw 2.png';

const PaymentsCards = ({ paymentHistoryRows = [] }) => {
  const pendingCount = paymentHistoryRows.filter(
    row => String(row?.status || '').toLowerCase() === 'pending'
  ).length;

  const completedCount = paymentHistoryRows.filter(
    row => String(row?.status || '').toLowerCase() === 'completed'
  ).length;

  const totalPayments = paymentHistoryRows.reduce((sum, row) => {
    const value = row?.price;
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);

  const totalWithdraw = paymentHistoryRows.reduce((sum, row) => {
    const value = row?.platFormFee;
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);

  const formatCurrency = value => {
    if (typeof value !== 'number') return '$0';
    return `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Active Users */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between ">
              <p className="text-base  ">Pending Bookings</p>
              <p className="rounded-full flex justify-center items-center">
                <img src={img1} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">
              {pendingCount.toLocaleString()}
            </p>
          </div>
        </Col>
        {/* Monthly Revenue */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Total Payments</p>
              <p className="bg-white rounded-full flex justify-center items-center">
                <img src={img2} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">
              {formatCurrency(totalPayments)}
            </p>
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
            <p className="text-primary text-xl font-bold ">
              {completedCount.toLocaleString()}
            </p>
          </div>
        </Col>
        {/* AI Interactions */}
        <Col>
          <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
            <div className="flex gap-3 justify-between items-center">
              <p className="text-base  ">Total Earnings</p>
              <p className="bg-white rounded-full ">
                <img src={img4} alt="" />
              </p>
            </div>
            <p className="text-primary text-xl font-bold ">
              {formatCurrency(totalWithdraw)}
            </p>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default PaymentsCards;
