import React, { useEffect, useState } from 'react';
import GameBody from './GameBody';

const ClientView = ({ socket }) => {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    
    return (
        <div className="chat__main">
          <GameBody
            messages={messages}
          />
        </div>
    );
};

export default ClientView;
