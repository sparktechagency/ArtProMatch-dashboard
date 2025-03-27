import { FaUser } from "react-icons/fa";

const artists = [
  { name: "Jerome Bell", role: "Tattoo artist" },
  { name: "Albert Flores", role: "Piercing artist" },
  { name: "Ronald Richards", role: "Tattoo artist" },
];

const TopArtist = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h3 className="text-md md:text-xl font-semibold text-gray-800 px-2 md:px-0 mb-2">
        Top Artist
      </h3>

      <div className="bg-white p-5 border-primary rounded-md shadow-md">
        <div className="flex flex-col gap-4">
          {artists.map((artist, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Avatar with vertical line */}
              <div className="flex flex-col items-center">
                <FaUser className="text-gray-600 text-xl h-8 w-8 p-2 rounded-full border-2" />
                {index !== artists.length - 1 && (
                  <div className="h-8 border-l-2 border-gray-300"></div>
                )}
              </div>

              {/* Artist Info */}
              <div>
                <p className="font-medium text-gray-900">{artist.name}</p>
                <p className="text-sm text-gray-500">{artist.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtist;
