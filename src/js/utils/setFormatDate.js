const setFormatDate = (newsDate) => {
  const date = new Date(newsDate);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleString('ru', options);
};

export default setFormatDate;
