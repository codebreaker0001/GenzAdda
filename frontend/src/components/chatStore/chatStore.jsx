import { useDispatch, useSelector } from 'react-redux';
import './chatStore.css';
import React, { useEffect, useState } from 'react';
import UserImage from '../userImage';
import { setFriends } from "../../state";
import axios from 'axios';

function ChatStore({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    useEffect(() => {
  const getUser = async () => {
    try{
      const response = await fetch(`https://genzadda-1.onrender.com/users/${friendId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUser(data);
    //   console.log(data);
    //   dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };



    getUser()
  }, [currentUser,conversation]); // Ensure dependencies are correctly set

  // console.log(conversation);
  return (
    <div className='conversation'>
      {user && <UserImage image={user.picturePath} />}
      <span className='conversationName'>{user?.firstName}</span>
    </div>
  );
}

export default ChatStore;
