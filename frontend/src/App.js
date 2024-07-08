// import { Button } from '@chakra-ui/react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import HomePage from './MyComponents/main/HomePage';
import ChatPage from './MyComponents/main/ChatPage';
import { useEffect, useState } from 'react';

function App() {


  
  return (
    // <Router>  // inside index.js
        
        <>
          <Routes>
            <Route exact path="/" element={<HomePage />} ></Route>
            <Route exact path="/chats" element={<ChatPage />} />    
          </Routes>
        </>
      
    
  // </Router>  // inside index.js
 
  );
}

export default App;
