import React from 'react';
import useTypeWriter from '../hooks/useTypeWriter';

type Props = {
  message: string;
};

const Messenger: React.FC<Props> = ({ message }) => {
  const { msg } = useTypeWriter({ message });

  return (
    <div className="flex flex-col my-4 text-center">
      <p className="text-xl font-bold">{msg}</p>
    </div>
  );
};

export default Messenger;
