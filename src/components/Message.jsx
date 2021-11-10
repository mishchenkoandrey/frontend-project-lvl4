// @ts-check

import React from 'react';

const Message = ({ message }) => {
  const { nickname, body } = message;
  return (
    <div className="text-break mb-2">
      <b>{nickname}</b>
      {`: ${body}`}
    </div>
  );
};

export default Message;
