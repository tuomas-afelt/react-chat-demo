import React from 'react';
import Message from './Message.jsx';

export default ({credentials, messages, onEdit, onDelete}) => {
  if (!messages.length) {
    return (
      <span className="chat__not-found">No messages...</span>
    );
  }

  return (
      <ul className="chat__list">{messages.map(message =>
        <li className="chat__item" key={message.id}>
          <Message
            credentials={credentials}
            user={message.user}
            text={message.text}
            onEdit={onEdit.bind(null, message.id)}
            onDelete={onDelete.bind(null, message.id)} />
        </li>
      )}</ul>
  );
}
