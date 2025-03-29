/* eslint-disable react/prop-types */
import user from "../../../assets/image/User 2.png";
const NotificationModal = () => {
  return (
    <div>
      <h1 className="text-xl font-bold border-0 border-b pb-2 ">
        (0) Notifications
      </h1>
      <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
        <img
          src={user}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-neutral-600">
            Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been
            confirmed!
          </h3>
          <p className="text-gray-500 text-sm">3 days ago</p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
        <img
          src={user}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-neutral-600">
            Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been
            confirmed!
          </h3>
          <p className="text-gray-500 text-sm">3 days ago</p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-0 border-b pb-2 mb-2">
        <img
          src={user}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-neutral-600">
            Your booking with Alex Rivera for Dec 10, 2024, at 11:30 AM has been
            confirmed!
          </h3>
          <p className="text-gray-500 text-sm">3 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
