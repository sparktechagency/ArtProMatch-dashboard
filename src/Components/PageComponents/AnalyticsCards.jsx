/* eslint-disable react/prop-types */
import { Col, Skeleton } from 'antd';

import img1 from '../../assets/image/User 2.png';
import img2 from '../../assets/image/Artist 2.png';
import img3 from '../../assets/image/Business 2.png';
import img4 from '../../assets/image/Easning 2.png';

const formatNumber = value => {
  if (typeof value !== 'number') return '0';
  if (value >= 1000) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  }
  return value;
};

const AnalyticsCards = ({ stats, isLoading, isError }) => {
  const cards = [
    {
      title: 'Total client',
      value: formatNumber(stats?.totalClients?.count),
      image: img1,
      isPositive: stats?.totalClients?.isPositive === true,
      trend:
        typeof stats?.totalClients?.growthRate === 'string'
          ? stats?.totalClients?.isPositive === true
            ? `+${stats?.totalClients?.growthRate} this month`
            : `-${stats?.totalClients?.growthRate} this month`
          : '',
    },
    {
      title: 'Artist',
      value: formatNumber(stats?.totalArtists?.count),
      image: img2,
      isPositive: stats?.totalArtists?.isPositive === true,
      trend:
        typeof stats?.totalArtists?.growthRate === 'string'
          ? stats?.totalArtists?.isPositive === true
            ? `+${stats?.totalArtists?.growthRate} this month`
            : `-${stats?.totalArtists?.growthRate} this month`
          : '',
    },
    {
      title: 'Business',
      value: formatNumber(stats?.totalBusinesses?.count),
      image: img3,
      isPositive: stats?.totalBusinesses?.isPositive === true,
      trend:
        typeof stats?.totalBusinesses?.growthRate === 'string'
          ? stats?.totalBusinesses?.isPositive === true
            ? `+${stats?.totalBusinesses?.growthRate} this month`
            : `-${stats?.totalBusinesses?.growthRate} this month`
          : '',
    },
    {
      title: 'Earning',
      value: stats?.totalEarnings?.count
        ? `$${stats.totalEarnings?.count.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : '$0.00',
      image: img4,
      isPositive: stats?.totalEarnings?.isPositive === true,
      trend:
        typeof stats?.totalEarnings?.growthRate === 'string'
          ? stats?.totalEarnings?.isPositive === true
            ? `+${stats?.totalEarnings?.growthRate} this month`
            : `-${stats?.totalEarnings?.growthRate} this month`
          : '',
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map(card => (
          <Col key={card.title}>
            <div className=" border-r-2 p-4 bg-white rounded-md gap-5  h-auto md:h-28">
              <div className="flex gap-3 justify-between items-center">
                <p className="text-base  ">{card.title}</p>
                <p className="rounded-full flex justify-center items-center">
                  <img src={card.image} alt={card.title} />
                </p>
              </div>
              {isLoading ? (
                <Skeleton active paragraph={false} title={{ width: 80 }} />
              ) : (
                <p className="text-primary text-xl font-bold ">{card.value}</p>
              )}
              {!isError && !isLoading && card.trend && (
                <p
                  className={`text-sm ${
                    card.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {card.trend}
                </p>
              )}
              {isError && !isLoading && (
                <p className="text-sm text-red-500">Failed to load data</p>
              )}
            </div>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCards;
