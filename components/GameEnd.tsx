import React from 'react';

import { Character } from '@prisma/client';

type Props = {
  winner: { name: string; character: Character } | undefined;
};

const GameEnd: React.FC<Props> = ({ winner }) => {
  if (!winner) return <div>Error...</div>;
  return (
    <div className="flex flex-col p-4 container mx-auto">
      <h1 className="font-bold text-center text-2xl mb-2">
        Winner is: {winner.name} with
        <span className="text-3xl text-orange-400"> {winner.character.name}</span>
      </h1>
      <div className="grid grid-cols-2 border rounded p-2 mt-auto">
        <div className="flex flex-col space-y-1">
          <div>
            Health: <p>{winner.character.health}</p>
          </div>
          <div>
            Attack: <p>{winner.character.attack}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div>
            Defence: <p>{winner.character.defence}</p>
          </div>
          <div>
            Delay: <p>{winner.character.delay}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEnd;
