export const getCleanImageUrl = (path) => {
   if (!path)
     return 'https://res.cloudinary.com/dweesppci/image/upload/v1746204369/wtmpcphfvexcq2ubcss0.png';

  if (path.startsWith('http')) {
    return path;
  }

  return `${import.meta.env.VITE_MY_BACKEND}/${path}`;
};

export const makeImageUrl = (path) => {
  return path.replace(`${import.meta.env.VITE_MY_BACKEND}/`, '');
};
