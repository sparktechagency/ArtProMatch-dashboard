import AllUser from "../../Components/PageComponents/AllUser";
import AnalyticsCards from "../../Components/PageComponents/AnalyticsCards";
import AppointmentSummery from "../../Components/PageComponents/AppointmentSummery";
import RevinueStats from "../../Components/PageComponents/RevinueStats";
import TopArtist from "../../Components/PageComponents/TopArtist";

const Analytics = () => {
  return (
    <div>
      <AnalyticsCards />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <AppointmentSummery />
        <RevinueStats />
      </div>
      <div className="w-full flex justify-between items-center gap-5">
        <div className="w-full md:w-[70%]">
          <AllUser></AllUser>
        </div>
        <div className="w-full md:w-[30%]">
          <TopArtist></TopArtist>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
