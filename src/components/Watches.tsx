import React, { useState } from 'react';
import Watch from './Watch';
import { v4 as uuidv4 } from 'uuid';
import '../Watches.css';

interface WatchData {
  id: string;
  name: string;
  timezone: string;
}

const Watches: React.FC = () => {
  const [watches, setWatches] = useState<WatchData[]>([]);
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');

  const handleAddWatch = () => {
    if (name && timezone) {
      const newWatch: WatchData = {
        id: uuidv4(),
        name,
        timezone,
      };
      setWatches([...watches, newWatch]);
      setName('');
      setTimezone('');
    }
  };

  const handleRemoveWatch = (id: string) => {
    setWatches(watches.filter(watch => watch.id !== id));
  };

  return (
    <div className="watches">
      <div className="form">
        <input
          type="text"
          value={name}
          placeholder="Название"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={timezone}
          placeholder="Временная зона"
          onChange={(e) => setTimezone(e.target.value)}
        />
        <button onClick={handleAddWatch}>Добавить</button>
      </div>
      <div className="watches-list">
        {watches.map((watch) => (
          <Watch
            key={watch.id}
            id={watch.id}
            name={watch.name}
            timezone={watch.timezone}
            onRemove={handleRemoveWatch}
          />
        ))}
      </div>
    </div>
  );
};

export default Watches;
