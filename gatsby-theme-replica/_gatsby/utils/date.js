const getDateString = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';

  return d.toLocaleDateString('fr-CA', {
    timeZone: process.env.TZ || 'UTC',
  });
};

module.exports = {
  getDateString,
};
