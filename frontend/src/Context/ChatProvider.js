import React, { createContext, useContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();     
  
  const history = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));    // _id , name , email pic , success , token 
    setUser(userInfo);    // _id , name , email , pic , success , token 
    if (!userInfo) history("/");  // make chatProvider inside Router ::  useNavigate() may be used only in the context of a <Router> component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
