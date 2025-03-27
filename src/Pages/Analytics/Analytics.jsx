import AnalyticsCards from "../../Components/PageComponents/AnalyticsCards";
import AppointmentSummery from "../../Components/PageComponents/AppointmentSummery";
import RevinueStats from "../../Components/PageComponents/RevinueStats";

const Analytics = () => {
  return (
    <div>
      <AnalyticsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AppointmentSummery />
        <RevinueStats />
      </div>
    </div>
  );
};

export default Analytics;
