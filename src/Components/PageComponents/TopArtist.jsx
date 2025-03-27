import { Card } from "antd";
import { FaUser } from "react-icons/fa";

const artists = [
  { name: "Jerome Bell", role: "Tattoo artist" },
  { name: "Albert Flores", role: "Piercing artist" },
  { name: "Ronald Richards", role: "Tattoo artist" },
];

const TopArtist = () => {
  return (
    <Card title="Top Artist in this Month" className="shadow-md w-72">
      <div className="flex flex-col items-start gap-3">
        {artists.map((artist, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Avatar with vertical line */}
            <div className="flex flex-col items-center">
              <FaUser className="text-gray-600 text-xl" />
              {index !== artists.length - 1 && (
                <div className="h-8 border-l-2 border-gray-300"></div>
              )}
            </div>

            {/* Artist Info */}
            <div>
              <p className="font-medium">{artist.name}</p>
              <p className="text-sm text-gray-500">{artist.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopArtist;
