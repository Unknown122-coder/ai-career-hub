import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { INTERVIEW_TOPICS, SUGGESTED_QUESTIONS } from '../../constants';
import { generateId, getInitials } from '../../utils';
import { useAuth } from '../../contexts';

const AI_RESPONSES = {
  'Explain closures in JavaScript': `A **closure** is a function that retains access to variables from its outer (lexical) scope, even after the outer function has returned.\n\n**Example:**\n\`\`\`js\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  };\n}\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2\n\`\`\`\n\nKey points:\n• Closures are created every time a function is created\n• They enable data privacy and encapsulation\n• Commonly used in callbacks, event handlers, and module patterns`,
  'What is the virtual DOM?': `The **Virtual DOM** is a lightweight JavaScript representation of the actual DOM.\n\n**How it works:**\n1. When state changes, React creates a new Virtual DOM tree\n2. It diffs the new tree with the previous one (reconciliation)\n3. Only the changed nodes are updated in the real DOM\n\n**Benefits:**\n• Minimizes expensive DOM operations\n• Enables declarative UI programming\n• Batches multiple updates for efficiency\n\nThis is why React can be very performant despite re-rendering components frequently.`,
  'default': `That's a great question! Here's a structured approach to answering it:\n\n1. **Define** the concept clearly\n2. **Explain** how it works under the hood\n3. **Provide** a practical example\n4. **Discuss** trade-offs and best practices\n\nWould you like me to elaborate on any specific aspect?`,
};

export default function InterviewPage() {
  const { user } = useAuth();
  const [activeTopic, setActiveTopic] = useState(INTERVIEW_TOPICS[0].id);
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm your AI interview prep assistant. Choose a topic from the sidebar or ask me any technical question to practice. I'll help you prepare with detailed answers and explanations.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim()) return;

      const userMsg = {
        id: generateId(),
        role: 'user',
        content: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      // Simulate AI response delay
      await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

      const responseContent = AI_RESPONSES[text.trim()] || AI_RESPONSES['default'];

      const aiMsg = {
        id: generateId(),
        role: 'ai',
        content: responseContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleSuggestionClick = useCallback(
    (question) => {
      sendMessage(question);
    },
    [sendMessage]
  );

  return (
    <div className="interview-page">
      {/* Sidebar — Topics */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-header">Interview Topics</div>
        <div className="topic-list">
          {INTERVIEW_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className={`topic-item ${activeTopic === topic.id ? 'active' : ''}`}
              onClick={() => setActiveTopic(topic.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveTopic(topic.id)}
            >
              <span style={{ marginRight: 8 }}>{topic.icon}</span>
              {topic.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-main">
        <div className="chat-header">
          <div>
            <h3 className="chat-title">AI Interview Assistant</h3>
            <div className="chat-status">
              <span className="status-dot" />
              <span>Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`chat-message ${msg.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="message-avatar"
                style={{
                  background: msg.role === 'ai'
                    ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                    : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  color: '#fff',
                }}
              >
                {msg.role === 'ai' ? (
                  <SmartToyIcon style={{ fontSize: 16 }} />
                ) : (
                  getInitials(user?.name || 'U')
                )}
              </div>
              <div>
                <div className="message-content">
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <p className="message-time">{msg.time}</p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="chat-message ai"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="message-avatar"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff' }}
                >
                  <SmartToyIcon style={{ fontSize: 16 }} />
                </div>
                <div className="typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="suggested-questions">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              className="suggested-btn"
              onClick={() => handleSuggestionClick(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              className="chat-input"
              type="text"
              placeholder="Ask a technical question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type your message"
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <SendIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
