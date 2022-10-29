import React, { useEffect, useState } from 'react';
import { sleep } from '../utils/utils';

type Props = {
  message: string | undefined;
};

const useTypeWriter = ({ message }: Props) => {
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    if (message === undefined || message.length <= 0) return;

    (async () => {
      setMsg('');
      let m = '';
      for (let i = 0; i < message.length; i++) {
        m = m + message[i];
        setMsg(m);
        await sleep(25);
      }
    })();
  }, [message]);

  return {
    msg,
  };
};

export default useTypeWriter;
