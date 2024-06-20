import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import "./onlineChat.css";
import UserImage from '../userImage';
import { useSelector } from 'react-redux';

function OnlineChat({ onlineUser, currentId,setCurrentChat }) {
  const user = useSelector((state) => state.user);
  const [onlineFriends, setOnlineFriends] = useState([]);

  // console.log(user.friends);

  // console.log(onlineUser);


  useEffect(() => {
    setOnlineFriends(user.friends.filter((f) => onlineUser.some((u) => u._id === f._id)));
  }, [user.friends, onlineUser]);
  // console.log(onlineFriends);

  const handleClick = async (friend) => {
    try {
      const response = await axios.get(`http://localhost:3001/chats/find/${currentId}/${friend._id}`);
      if (response.data) {
        setCurrentChat(response.data);
      } else {
        // If chat does not exist, create a new one
        const newChatResponse = await axios.post(`http://localhost:3001/chats`, {
          senderId: currentId,
          receiverId: friend._id,
        });
        setCurrentChat(newChatResponse.data);
      }
    } catch (error) {
      console.error('Error fetching or creating conversation:', error);
    }
  };

  return (
    <div className="chatOnline">
      {user.friends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}  key={o._id}>
          <div className="chatOnlineImgContainer">
            {/* {console.log(o)} */}
            <UserImage image={o.picturePath} />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{`${o.firstName} ${o.lastName}`}</span>
        </div>
      ))}
    </div>
  );
}

export default OnlineChat;
