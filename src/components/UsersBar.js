import React, { useState, useEffect } from 'react';

const UserBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="user-sidebar">
      <h2>users bar</h2>
      <div>
        <h4 className="user-header">ACTIVE USERS</h4>
        <div className="users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBar;