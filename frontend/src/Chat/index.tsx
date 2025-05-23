import React, { useState, useRef, useEffect } from 'react';

type Message = {
  sender: 'You' | 'AI';
  text: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: 'You', text: input }]);
    const userMessage = input;
    setInput('');

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_message: userMessage  }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMessages(prev => [...prev, { sender: 'AI', text: data.message }]);
      } else {
        setMessages(prev => [...prev, { sender: 'AI', text: 'Lỗi từ server' }]);
      }
    } catch {
      setMessages(prev => [...prev, { sender: 'AI', text: 'Không thể kết nối' }]);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '20px auto', padding: '10px' }}>
      <h2>Chat with AI</h2>
      <div
        style={{
          border: '1px solid #ccc',
          height: '400px',
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '10px'
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '8px 0' }}>
            <strong>{m.sender}:</strong> {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: 'flex' }}>
        <input
          style={{ flexGrow: 1, padding: '8px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={()=>handleSend()} style={{ marginLeft: '10px', padding: '8px 16px' }}>Send</button>
      </div>
    </div>
  );
};

export default Chat;