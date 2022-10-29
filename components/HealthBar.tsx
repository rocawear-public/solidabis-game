import React from 'react';
import { Character } from '@prisma/client';

type Props = {
  health: number | undefined;
  max: number | undefined;
};

const HealthBar: React.FC<Props> = ({ health, max }) => {
  if (health === undefined || max === undefined) return <div>Error..</div>;
  const val = (health / max) * 100;

  let className;
  if (val >= 75) {
    className = 'bg-green-500';
  } else if (val >= 50) {
    className = 'bg-yellow-500';
  } else if (val >= 25) {
    className = 'bg-orange-500';
  } else {
    className = 'bg-red-500';
  }

  return (
    <div className="rounded w-full bg-neutral-200">
      <div
        style={{ width: `${val}%` }}
        className={`h-10 bg-green-500 flex items-center rounded justify-center transform transition ${className}`}
      >
        {health.toFixed()}
      </div>
    </div>
  );
};

export default HealthBar;
