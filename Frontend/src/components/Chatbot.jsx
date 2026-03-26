import { useState, useRef, useEffect, useCallback } from 'react';
import './Chatbot.css';

const API_URL = 'http://localhost:5000/api/chat';
const SESSION_KEY = 'cyberlearn_chat_history';

const WELCOME = { id: 1, from: 'bot', text: "Hey there! 👋 I'm your CyberLearn Assistant. Ask me anything about the platform or cybersecurity topics!" };

// Load messages from sessionStorage (persists for the browser tab session)
const loadSession = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : [WELCOME];
  } catch {
    return [WELCOME];
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadSession);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState('');   // animated bot reply
  const [isTyping, setIsTyping] = useState(false);    // typing animation active
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const typingRef = useRef(null);

  // Auto-resize textarea as content grows
  const resizeInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, typingText]);

  // Animate bot reply character by character
  const animateReply = useCallback((fullText, onDone) => {
    setIsTyping(true);
    setTypingText('');
    let i = 0;

    typingRef.current = setInterval(() => {
      i++;
      setTypingText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(typingRef.current);
        setIsTyping(false);
        onDone(fullText);
      }
    }, 18); // speed: lower = faster
  }, []);

  // Cleanup interval on unmount
  useEffect(() => () => clearInterval(typingRef.current), []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading || isTyping) return;

    const userMsg = { id: Date.now(), from: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Reset textarea height after clearing
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    setIsLoading(true);

    // Build history excluding the welcome message (id:1) and the just-added user msg
    const history = messages
      .filter(m => m.id !== 1 && !m.isError)
      .map(m => ({ from: m.from, text: m.text }));

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Something went wrong.');

      setIsLoading(false);

      // Start typing animation, then commit final message
      animateReply(data.reply, (finalText) => {
        setTypingText('');
        setMessages(prev => [...prev, { id: Date.now(), from: 'bot', text: finalText }]);
      });

    } catch (err) {
      setIsLoading(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now(), from: 'bot', text: `⚠️ ${err.message}`, isError: true }
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    // Shift+Enter falls through naturally — textarea inserts a newline
  };

  // Prevent page scroll when scrolling inside chat messages
  const handleWheel = useCallback((e) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop === 0 && e.deltaY < 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
    if (!atTop && !atBottom) {
      e.stopPropagation();
    }
  }, []);

  const clearHistory = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setMessages([WELCOME]);
  };

  const isBusy = isLoading || isTyping;

  return (
    <>
      {/* Floating toggle button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle chat"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🤖</span>
              <div>
                <p className="chat-title">CyberLearn Assistant</p>
                <p className="chat-status">{isBusy ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-clear-btn" onClick={clearHistory} title="Clear chat">🗑</button>
              <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={messagesContainerRef} onWheel={handleWheel}>
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.from}`}>
                <div className={`message-bubble ${msg.isError ? 'error' : ''}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing animation bubble */}
            {isTyping && typingText && (
              <div className="chat-message bot">
                <div className="message-bubble typing-text">
                  {typingText}<span className="cursor" />
                </div>
              </div>
            )}

            {/* Loading dots (waiting for API) */}
            {isLoading && (
              <div className="chat-message bot">
                <div className="message-bubble typing-indicator">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder={isBusy ? 'Please wait...' : 'Ask anything...'}
              value={input}
              onChange={e => { setInput(e.target.value); resizeInput(); }}
              onKeyDown={handleKeyDown}
              disabled={isBusy}
              rows={1}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isBusy}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
