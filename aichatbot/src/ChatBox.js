import { useState, useRef, useEffect } from 'react';
import { fetchHistory, sendMessage } from './api/chatApi';
import './ChatBox.css';

const SESSION_KEY = 'ai_chat_key';

export function getOrCreateChatKey() {
  let key = sessionStorage.getItem(SESSION_KEY);
  if (!key) {
    key = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, key);
  }
  return key;
}

function mapApiMessage(msg) {
  return { text: msg.text, sender: msg.role };
}

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const sessionId = getOrCreateChatKey();
    setIsLoading(true);
    setLoadError(null);

    fetchHistory(sessionId)
      .then((data) => {
        setMessages(data.messages.map(mapApiMessage));
      })
      .catch(() => {
        setLoadError('Failed to load conversation. Please refresh the page.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const el = bottomRef.current;
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isWaiting, isLoading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isWaiting || isLoading) return;

    const sessionId = getOrCreateChatKey();
    setMessages((prev) => [...prev, { text: trimmed, sender: 'user' }]);
    setInput('');
    setIsWaiting(true);

    try {
      const { reply } = await sendMessage(trimmed, sessionId);
      setMessages((prev) => [...prev, { text: reply, sender: 'bot' }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: 'Something went wrong, try again', sender: 'bot' },
      ]);
    } finally {
      setIsWaiting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const inputDisabled = isLoading || isWaiting;

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {isLoading && (
          <div className="chat-status">Loading conversation...</div>
        )}
        {loadError && !isLoading && (
          <div className="chat-error">{loadError}</div>
        )}
        {!isLoading && (
          <>
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
          </>
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
          disabled={inputDisabled}
        />
        <button type="button" onClick={handleSend} disabled={inputDisabled}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
