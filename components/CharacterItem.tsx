import React from 'react';

import { Character } from '@prisma/client';

type Props = {
  character: Character;
  handleCharacterChange: (character: Character) => void;
};

const CharacterItem: React.FC<Props> = ({ character, handleCharacterChange }) => {
  return (
    <div
      onClick={() => handleCharacterChange(character)}
      className="flex flex-col border p-2 text-center rounded"
      style={{ backgroundColor: character.color }}
    >
      <p className="text-sm font-semibold mb-2">{character.name}</p>
      <div className="grid grid-cols-2 p-2 mt-auto">
        <div className="flex flex-col space-y-1">
          <div>
            Health: <p>{character.health}</p>
          </div>
          <div>
            Attack: <p>{character.attack}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div>
            Defence: <p>{character.defence}</p>
          </div>
          <div>
            Delay: <p>{character.delay}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
