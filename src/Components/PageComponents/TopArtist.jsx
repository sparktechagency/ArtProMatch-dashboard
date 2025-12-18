/* eslint-disable react/prop-types */
import { Avatar, Skeleton } from 'antd';
import { getCleanImageUrl } from '../../utils/getCleanImageUrl';

const TopArtist = ({ topArtists = [], isLoading }) => {
  const hasArtists = Array.isArray(topArtists) && topArtists.length > 0;

  const getInitials = name => {
    if (!name) return '';
    return String(name)
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase())
      .join('');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h3 className="text-md md:text-xl font-semibold text-gray-800 px-2 md:px-0 mb-2">
        Top Artist
      </h3>

      <div className="bg-white p-5 border-primary rounded-md shadow-md">
        <div className="flex flex-col gap-4">
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} active avatar paragraph={{ rows: 1 }} />
              ))}
            </div>
          )}

          {!isLoading && !hasArtists && (
            <p className="text-center text-sm text-gray-500">
              No top artists found
            </p>
          )}

          {!isLoading &&
            hasArtists &&
            topArtists.map((artist, index) => (
              <div
                key={`${artist.fullName}-${index}`}
                className="flex items-center gap-4"
              >
                {/* Avatar with vertical line */}
                <div className="flex flex-col items-center">
                  <Avatar
                    size={32}
                    className="border-2 border-gray-200 bg-primary"
                    src={getCleanImageUrl(artist?.image)}
                  >
                    {getInitials(artist?.fullName)}
                  </Avatar>
                  {index !== topArtists.length - 1 && (
                    <div className="h-8 border-l-2 border-gray-300"></div>
                  )}
                </div>

                {/* Artist Info */}
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {artist?.fullName || '-'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {artist?.email || '-'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {artist?.phoneNumber || '-'}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtist;
