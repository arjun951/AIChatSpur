import { useState, useRef, useEffect } from 'react';
import './ChatBox.css';

const SESSION_KEY = 'ai_chat_key';
const REPLY_DELAY_MS = 3000;

export function getOrCreateChatKey() {
  let key = sessionStorage.getItem(SESSION_KEY);
  if (!key) {
    key = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, key);
  }
  return key;
}

function formatBotReply(uuid) {
  return `Your session ID: ${uuid}`;
}

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const bottomRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const el = bottomRef.current;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isWaiting]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isWaiting) return;

    setMessages((prev) => [...prev, { text: trimmed, sender: 'user' }]);
    setInput('');
    setIsWaiting(true);

    timeoutRef.current = setTimeout(() => {
      const chatKey = getOrCreateChatKey();
      setMessages((prev) => [
        ...prev,
        { text: formatBotReply(chatKey), sender: 'bot' },
      ]);
      setIsWaiting(false);
    }, REPLY_DELAY_MS);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        <div className="chat-spacer" aria-hidden="true" />
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}
          >
            {msg.sender === 'bot' && (
              <div className="msg-label">
                <span className="msg-label-icon" aria-hidden="true">
                  &#10022;
                </span>
                AI Suggestion
              </div>
            )}
            <div
              className={`msg-bubble ${
                msg.sender === 'bot' ? 'msg-bubble-bot' : 'msg-bubble-user'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isWaiting && (
          <div className="msg msg-bot">
            <div className="msg-label">
              <span className="msg-label-icon" aria-hidden="true">
                &#10022;
              </span>
              AI Suggestion
            </div>
            <div className="msg-bubble msg-bubble-bot msg-typing">
              AI is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isWaiting}
        />
        <button type="button" onClick={handleSend} disabled={isWaiting}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
