import React from 'react';
import { DatePicker } from 'antd';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetYearlyRevenueStatsQuery } from '../../redux/features/adminApis';

const RevinueStats = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));

  const { data, isLoading, isError } =
    useGetYearlyRevenueStatsQuery(selectedYear);

  // Transform API data to match chart format
  const chartData = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data.map(item => ({
      name: new Date(0, item.month - 1).toLocaleString('default', {
        month: 'short',
      }),
      Earning: item.earning || 0,
    }));
  }, [data]);

  if (isLoading) return <div>Loading revenue data...</div>;
  if (isError) return <div>Error loading revenue data</div>;

  const onChange = (_, dateString) => {
    setSelectedYear(dateString || dayjs().format('YYYY'));
  };

  const disableFutureYears = current => {
    return current && current.year() > dayjs().year();
  };

  return (
    <div className="mt-4 p-4">
      <div className="bg-gray-50 rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">
            Total Revenue Stats
          </h1>
          <DatePicker
            onChange={onChange}
            value={dayjs(selectedYear, 'YYYY')}
            format={'YYYY'}
            picker="year"
            disabledDate={disableFutureYears}
            className="w-full md:w-auto"
          />
        </div>

        {/* Chart Section */}
        <div className="mt-6" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} /> {/* Force all labels */}
              <YAxis />
              <Tooltip
                formatter={value => [`$${value.toFixed(2)}`, 'Earnings']}
              />
              <Legend />
              <Bar
                dataKey="Earning"
                name="Earnings"
                fill="#816a6b"
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevinueStats;
