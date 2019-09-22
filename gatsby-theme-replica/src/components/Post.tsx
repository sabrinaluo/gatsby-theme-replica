import React from 'react';

// const getDate = (date, { day = true, month = true, year = true } = {}) =>
//   date.toLocaleDateString('en-US', {
//     day: day ? 'numeric' : undefined,
//     month: month ? 'long' : undefined,
//     year: year ? 'numeric' : undefined,
//   });
const EventDate = data => {
  console.log(data);
  const isOneDay = true;
  return (
    <>
      <time dateTime=''></time>
      {!isOneDay && <>6878</>}
    </>
  );
};
const Post = ({ name, id, location, url, startDate, endDate }) => (
  <div>
    <h2>
      {name} ({location})
    </h2>
    <p>
      <EventDate startDate={startDate} endDate={endDate} />
    </p>
    <p>
      Website: <a href={url}>{url}</a> {id}
    </p>
  </div>
);

export default Post;
