import React, { useEffect, useState } from 'react';
import { Character } from '@prisma/client';
import { sleep } from '../utils/utils';

type Props = {
  player: Character | undefined;
  enemy: Character | undefined;
  status: boolean;
};

enum Turn {
  Player = 0,
  Enemy = 1,
}

const useBattleSimulation = ({ player, enemy, status }: Props) => {
  const [turn, setTurn] = useState<Turn | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const [playerHealth, setPlayerHealth] = useState<number | undefined>(undefined);
  const [enemyHealth, setEnemyHealth] = useState<number | undefined>(undefined);
  const [running, setRunning] = useState<boolean>(false);

  const changeStatus = (status: boolean) => {
    setRunning(status);
  };

  const changeMessage = (message: string) => {
    setMessage(message);
  };

  useEffect(() => {
    if (player === undefined || enemy === undefined) return;
    setPlayerHealth(player.health);
    setEnemyHealth(enemy.health);
  }, [player, enemy]);

  useEffect(() => {
    if (player === undefined || enemy === undefined) return;
    if (!status) return;

    switch (turn) {
      case Turn.Player:
        changeStatus(false);
        changeMessage(`Player is going to attack!`);
        sleep(1000).then(() => {
          setEnemyHealth((prev) =>
            prev !== undefined && prev - player.attack > 0 ? prev - player.attack : 0
          );
          changeMessage(`Player did ${player.attack} damage!`);
          sleep(1000).then(() => {
            changeStatus(true);
            setTurn(Turn.Enemy);
          });
        });
        break;
      case Turn.Enemy:
        changeStatus(false);
        changeMessage(`Enemy is going to attack!`);
        sleep(1000).then(() => {
          setPlayerHealth((prev) =>
            prev !== undefined && prev - enemy.attack > 0 ? prev - enemy.attack : 0
          );
          changeMessage(`Enemy did ${enemy.attack} damage!`);
          sleep(1000).then(() => {
            changeStatus(true);
            setTurn(Turn.Player);
          });
        });
        break;
      case undefined:
        (async () => {
          changeStatus(false);
          const turn = Math.floor(Math.random() * 2) === 0 ? Turn.Player : Turn.Enemy;
          changeMessage(`${turn === Turn.Player ? 'Player starts..' : 'Enemy starts..'}`);
          await sleep(2000);
          changeMessage('3...');
          await sleep(1000);
          changeMessage('2...');
          await sleep(1000);
          changeMessage('1...');
          await sleep(1000);
          changeMessage('GO...');
          setTurn(turn);
          changeStatus(true);
        })();
    }
  }, [turn, status, enemy, player]);

  return {
    message,
    playerHealth,
    enemyHealth,
    running,
  };
};

export default useBattleSimulation;
