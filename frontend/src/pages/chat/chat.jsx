import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../navbar/navbar';
import ChatStore from '../../components/chatStore/chatStore';
import Message from '../../components/message/message';
import OnlineChat from '../../components/onlineChats/onlineChat';
import './chat.css';
import { io } from "socket.io-client";

function Chat() {
  const user = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("https://genzadda-2.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  console.log(socket);
  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
  
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.friends.filter((f) => users.some((u) => u.userId === f._id))
      );
    });
  }, [user]);

  // console.log(onlineUsers);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`https://genzadda-1.onrender.com/chats/${user._id}`);
        setConversations(response.data);
      } catch (error) {
        console.log('Error fetching conversations:', error);
      }
    };

    getConversations();
  }, [user._id]);
  // setConversations(onlineUsers)
  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {
        try {
          const res = await axios.get(`https://genzadda-1.onrender.com/messages/${currentChat._id}`);
          setMessages(res.data);
        } catch (error) {
          console.log('Error fetching messages:', error);
        }
      }
    };

    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      picturePath: user.picturePath,
      text: newMessages,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user._id);
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      picturePath: user.picturePath,
      text: newMessages,
    });

    try {
      const response = await axios.post(`https://genzadda-1.onrender.com/messages`, message);
      setMessages([...messages, response.data]);
      setNewMessages('');
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(messages);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // console.log(conversations);
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <ChatStore conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className='chatBoxTop'>
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user._id} currentUser={user}  />
                    </div>
                  ))}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation to start chat</span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <OnlineChat onlineUser={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
