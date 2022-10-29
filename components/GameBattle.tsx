import React, { useEffect, useState } from 'react';
import { Character } from '@prisma/client';

import useBattleSimulation from '../hooks/useBattleSimulation';
import HealthBar from './HealthBar';
import Messenger from './Messenger';
import { sleep } from '../utils/utils';

type Props = {
  character: Character | undefined;
  enemyCharacter: Character | undefined;
  handleWinnerChange: (winner: { name: string; character: Character }) => void;
};

const GameBattle: React.FC<Props> = ({ character, enemyCharacter, handleWinnerChange }) => {
  const [status, setStatus] = useState(true);
  const { message, playerHealth, enemyHealth, running } = useBattleSimulation({
    player: character,
    enemy: enemyCharacter,
    status,
  });

  const changeStatus = (status: boolean) => {
    setStatus(status);
  };

  useEffect(() => {
    if (character === undefined || enemyCharacter === undefined) return;

    if (enemyHealth === 0 && running === false) {
      changeStatus(false);
      sleep(2000).then(() => {
        handleWinnerChange({ name: 'Player', character: character });
      });
    }

    if (playerHealth === 0 && running === false) {
      changeStatus(false);
      sleep(2000).then(() => {
        handleWinnerChange({ name: 'Enemy', character: enemyCharacter });
      });
    }
  }),
    [enemyHealth, playerHealth];

  if (character === undefined || enemyCharacter === undefined) return <div>Error..</div>;

  return (
    <div className="flex flex-col p-4 min-h-screen bg-blue-400">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <h2 className="text-center my-2">{character.name}</h2>
          <HealthBar health={playerHealth} max={character.health} />
          <div className="flex flex-row gap-4 mt-2 p-2 bg-neutral-200 rounded">
            <p>
              Health: <span>{character.health}</span>
            </p>
            <p>
              Attack: <span>{character.attack}</span>
            </p>
            <p>
              Defence: <span>{character.defence}</span>
            </p>
            <p>
              Delay: <span>{character.delay}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-center my-2">{enemyCharacter.name}</h2>
          <HealthBar health={enemyHealth} max={enemyCharacter.health} />
          <div className="flex flex-row gap-4 mt-2 p-2 bg-neutral-200 rounded">
            <p>
              Health: <span>{enemyCharacter.health}</span>
            </p>
            <p>
              Attack: <span>{enemyCharacter.attack}</span>
            </p>
            <p>
              Defence: <span>{enemyCharacter.defence}</span>
            </p>
            <p>
              Delay: <span>{enemyCharacter.delay}</span>
            </p>
          </div>
        </div>
      </div>

      <Messenger message={message} />

      <div className="flex flex-row">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default GameBattle;
