import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const ChatBotComponent = ({ url }) => {
  const [showChat, setShowChat] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser?.name;

    // Pass the username to the iframe using postMessage
    const iframe = document.querySelector(".chatbot-iframe");
    iframe.contentWindow.postMessage({ type: 'SET_USERNAME', username: userName }, '*');
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    if (showChat && !iframeLoaded) {
      setIframeLoaded(true);
    }
  }, [showChat, iframeLoaded]);

  useEffect(() => {
    const handleMessage = (event) => {

      if (event.origin !== 'https://mychatt.streamlit.app?embed=true') return; // Validate the origin

      console.log('Message received from iframe:', event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (iframeLoaded) {
      const iframeWindow = iframeRef.current.contentWindow;
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        iframeWindow.postMessage({ type: 'setUser', user: currentUser.name }, 'https://mychatt.streamlit.app');
      }
    }
  }, [iframeLoaded]);

  return (
    <div className={`chatbot-container ${showChat ? 'show' : ''}`}>
      <div className="chatbot-circle btn btn-raised" onClick={toggleChat}>
        <div className="chatbot-overlay"></div>
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>
      <div className={`chatbot-box ${showChat ? 'show' : ''}`}>
        <div className="chatbot-header">
          ChatBot
          <span className="chatbot-toggle" onClick={toggleChat}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <iframe
          title="ChatBot"
          src="https://mychatt.streamlit.app?embed=true"
          className="chatbot-iframe"
          ref={iframeRef}
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </div>
  );
};

export default ChatBotComponent;
