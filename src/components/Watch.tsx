import React, { useEffect, useState } from 'react';
import '../Watch.css';

interface WatchProps {
  id: string;
  name: string;
  timezone: string;
  onRemove: (id: string) => void;
}

const Watch: React.FC<WatchProps> = ({ id, name, timezone, onRemove }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeWithOffset = (date: Date, offset: number) => {
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000 * offset);
  };

  const offsetTime = getTimeWithOffset(time, parseInt(timezone));

  return (
    <div className="watch">
      <h2>{name}</h2>
      <div className="watch-face">{offsetTime.toLocaleTimeString()}</div>
      <button onClick={() => onRemove(id)}>&times;</button>
    </div>
  );
};

export default Watch;
