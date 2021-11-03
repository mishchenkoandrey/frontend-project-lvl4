// @ts-check

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import _ from 'lodash';
import Message from './Message.jsx';

const Messages = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const findCurrentChannel = (state) => _.find(state.channelsInfo.channels, ['id', currentChannelId]);
  const currentChannel = useSelector(findCurrentChannel);
  console.log(currentChannel);
  const messages = useSelector((state) => state.messages);
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );

  const scrollToBottom = () => scroll.scrollToBottom({
    containerId: 'messages-box',
    duration: 50,
    delay: 0,
    smooth: 'easeInOutQuart',
  });

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelId, messages]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {currentChannel && (
              <>
                <span className="me-1">#</span>
                {currentChannel.name}
              </>
            )}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} сообщений`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {currentChannelMessages.map((message) => <Message key={message.id} message={message} />)}
      </div>
    </>
  );
};
export default Messages;
