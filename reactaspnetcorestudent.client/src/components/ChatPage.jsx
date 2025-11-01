import { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { sendChatMessage, getChatMessages } from './apiFunctions';
import './components_CSS/ChatPage.css';

export function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const messagesEndRef = useRef(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        loadMessages();
        // Refresh messages every 3 seconds for real-time updates
        const interval = setInterval(loadMessages, 3000);
        return () => clearInterval(interval);
    }, [lastUpdate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async () => {
        try {
            const chatMessages = await getChatMessages();
            setMessages(chatMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        setLoading(true);
        try {
            const messageData = {
                userId: currentUser.id,
                username: currentUser.username,
                userPhoto: currentUser.photo || 'User.png',
                message: newMessage.trim()
            };

            await sendChatMessage(messageData);
            setNewMessage('');
            setLastUpdate(Date.now()); // Trigger refresh
            await loadMessages(); // Immediate refresh
        } catch (error) {
            alert('Failed to send message: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);

        if (diffMins < 1) return 'now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;

        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="chat-page">
            <div className="chat-page-header">
                <h1>💬 Global Chat</h1>
                <div className="chat-stats">
                    <span className="message-count">{messages.length} messages</span>
                    {currentUser && <span className="user-status">Logged in as {currentUser.username}</span>}
                </div>
            </div>

            <div className="chat-page-container">
                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="system-message">
                            No messages yet. Start the conversation!
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={msg.id || index} className="message">
                                <img
                                    src={msg.userPhoto.startsWith('http') ? msg.userPhoto : `https://localhost:7129/pics/${msg.userPhoto}`}
                                    alt={msg.username}
                                    className="user-avatar"
                                    onError={(e) => {
                                        e.target.src = `https://localhost:7129/pics/User.png`;
                                    }}
                                />
                                <div className="message-content">
                                    <div className="message-header">
                                        <span className="username">
                                            {msg.username}
                                            {msg.userId === currentUser?.id && ' (you)'}
                                        </span>
                                        <span className="timestamp">
                                            {formatTime(msg.timestamp)}
                                        </span>
                                    </div>
                                    <div className="message-text">{msg.message}</div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="input-container">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={currentUser ? "Type your message..." : "Please log in to chat"}
                        className="message-input"
                        disabled={loading || !currentUser}
                        maxLength={500}
                    />
                    <button
                        type="submit"
                        className={`send-button ${loading || !newMessage.trim() || !currentUser ? 'send-button-disabled' : ''}`}
                        disabled={loading || !newMessage.trim() || !currentUser}
                    >
                        {loading ? '...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}
