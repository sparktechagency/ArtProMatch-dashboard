import NewUser from '../../Components/PageComponents/NewUser';
import AnalyticsCards from '../../Components/PageComponents/AnalyticsCards';
import AppointmentSummery from '../../Components/PageComponents/AppointmentSummery';
import RevinueStats from '../../Components/PageComponents/RevinueStats';
import TopArtist from '../../Components/PageComponents/TopArtist';
import { useFetchDashboardPageQuery } from '../../redux/features/adminApis';

const Analytics = () => {
  const { data, isLoading, isError } = useFetchDashboardPageQuery();
  const stats = data?.data?.stats;
  const newUsers = data?.data?.newUsers;
  const topArtists = data?.data?.topArtists;

  return (
    <div>
      <AnalyticsCards stats={stats} isLoading={isLoading} isError={isError} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <AppointmentSummery />
        <RevinueStats />
      </div>
      <div className="w-full flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <NewUser newUsers={newUsers} isLoading={isLoading} />
        </div>
        <div className="w-full md:w-[30%]">
          <TopArtist topArtists={topArtists} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
