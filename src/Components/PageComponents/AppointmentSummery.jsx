import { DatePicker } from 'antd';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetYearlyAppointmentStatsQuery } from '../../redux/features/adminApis';

const AppointmentSummery = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));

  const { data, isLoading, isError } =
    useGetYearlyAppointmentStatsQuery(selectedYear);

  // Transform API data to match chart format
  const chartData =
    data?.data?.map(item => ({
      name: new Date(0, item.month - 1).toLocaleString('default', {
        month: 'short',
      }),
      appointments: item.appointment,
    })) || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading appointment data</div>;

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
            Appointment Summary
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
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="colorAppointments"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={value => `${value}`} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="appointments"
                name="Appointments"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummery;
