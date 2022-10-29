import React, { useEffect, useState } from 'react';
import GameNew from './GameNew';
import GameBattle from './GameBattle';
import GameEnd from './GameEnd';
import { Character } from '@prisma/client';

type Props = {
  characters: Character[];
};

const GameContainer: React.FC<Props> = ({ characters }) => {
  const [status, setStatus] = useState<'new' | 'battle' | 'end'>('new');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>(undefined);
  const [enemyCharacter, setEnemyCharacter] = useState<Character | undefined>(undefined);
  const [winner, setWinner] = useState<{ name: string; character: Character } | undefined>(
    undefined
  );

  const [allCharacters] = useState<Character[]>(characters);

  const handleCharacterChange = (character: Character) => {
    const enemy = selectRandomEnemyCharacter(character);
    setSelectedCharacter(character);
    setEnemyCharacter(enemy);
    setStatus('battle');
    console.log(character, enemy);
  };

  const handleWinnerChange = (winner: { name: string; character: Character }) => {
    setWinner({ name: winner.name, character: winner.character });
    setStatus('end');
  };

  const selectRandomEnemyCharacter = (character: Character) => {
    const available = allCharacters?.filter((char) => char.name !== character.name);
    if (available === undefined) return;
    const enemy = available[Math.floor(Math.random() * available.length)];
    return enemy;
  };

  switch (status) {
    case 'new':
      return <GameNew characters={characters} handleCharacterChange={handleCharacterChange} />;
    case 'battle':
      return (
        <GameBattle
          character={selectedCharacter}
          enemyCharacter={enemyCharacter}
          handleWinnerChange={handleWinnerChange}
        />
      );
    case 'end':
      return <GameEnd winner={winner} />;
    default:
      return <GameNew characters={characters} handleCharacterChange={handleCharacterChange} />;
  }
};

export default GameContainer;
