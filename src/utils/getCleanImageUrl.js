export const getCleanImageUrl = (path) => {
  if (!path) return '/404.png';

  if (path.startsWith('http')) {
    return path;
  }

  return `${import.meta.env.VITE_MY_BACKEND}/${path}`;
};

export const makeImageUrl = (path) => {
  return path.replace(`${import.meta.env.VITE_MY_BACKEND}/`, '');
};
