import React from 'react';

export default ({ dateObj }) => {
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const amPm = hours > 12 ? 'pm' : 'am';

  if (hours > 12) {
    hours -= 12;
  }

  const time = `${hours}:${minutes}`;

  return (
    <div>
      <div>{time}</div>
      <div>{amPm}</div>
    </div>
  );
};
