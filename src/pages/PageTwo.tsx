import React, { useState, useRef, useEffect } from 'react';
import { testIds } from '../components/testIds';
import { PluginPage } from '@grafana/runtime';

// Define message type
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function PageTwo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: 'I received your message: "' + input + '". This is a demo response.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PluginPage>
      <div data-testid={testIds.pageTwo.container} style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '1024px', margin: '0 auto', padding: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px 24px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 4px 0' }}>Chatbot Assistant</h2>
            <p style={{ fontSize: '14px', color: '#bfdbfe', margin: '0' }}>Ask me anything</p>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#f9fafb' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}
              >
                <div
                  style={{
                    maxWidth: '384px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: msg.sender === 'user' ? '#2563eb' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#1f2937',
                    boxShadow: msg.sender === 'bot' ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none',
                    borderBottomRightRadius: msg.sender === 'user' ? '0' : '8px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '8px'
                  }}
                >
                  <p style={{ fontSize: '14px', margin: '0' }}>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ borderTop: '1px solid #e5e7eb', backgroundColor: 'white', padding: '16px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  fontSize: '14px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                onClick={handleSend}
                disabled={input.trim() === ''}
                style={{
                  backgroundColor: input.trim() === '' ? '#93c5fd' : '#2563eb',
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: input.trim() === '' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (input.trim() !== '') {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (input.trim() !== '') {
                    e.currentTarget.style.backgroundColor = '#2563eb';
                  }
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </PluginPage>
  );
}

export default PageTwo;