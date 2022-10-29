import React from 'react';
import { Character } from '@prisma/client';
import CharacterItem from './CharacterItem';

type Props = {
  characters: Character[];
  handleCharacterChange: (character: Character) => void;
};

const GameNew: React.FC<Props> = ({ characters, handleCharacterChange }) => {
  return (
    <div className="flex flex-col p-4 container mx-auto">
      <h1 className="mb-4 text-xl text-center">Select your character</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {characters.map((character) => {
          return (
            <CharacterItem
              key={character.id}
              character={character}
              handleCharacterChange={handleCharacterChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameNew;
