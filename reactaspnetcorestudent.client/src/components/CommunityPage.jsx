import React, { useState } from 'react';
import './components_CSS/CommunityPage.css';

const CommunityPage = () => {
  const [screenshots, setScreenshots] = useState([
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'Мой первый скриншот',
      author: 'Иван Иванов',
      rating: 15,
      userVote: 0,
      comments: [
        { id: 1, author: 'Петр', text: 'Отличный скрин!', date: '2024-01-15' },
        { id: 2, author: 'Мария', text: 'Классная графика!', date: '2024-01-16' }
      ]
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x300/ff0000',
      title: 'Эпичный момент',
      author: 'Алексей Петров',
      rating: 8,
      userVote: 0,
      comments: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [activeCommentScreenshot, setActiveCommentScreenshot] = useState(null);

  const handleVote = (screenshotId, voteType) => {
    setScreenshots(prev => prev.map(screenshot => {
      if (screenshot.id === screenshotId) {
        const voteChange = screenshot.userVote === voteType ? -voteType : voteType - screenshot.userVote;
        return {
          ...screenshot,
          rating: screenshot.rating + voteChange,
          userVote: screenshot.userVote === voteType ? 0 : voteType
        };
      }
      return screenshot;
    }));
  };

  const handleAddComment = (screenshotId) => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: 'Текущий пользователь',
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setScreenshots(prev => prev.map(screenshot => {
      if (screenshot.id === screenshotId) {
        return {
          ...screenshot,
          comments: [...screenshot.comments, comment]
        };
      }
      return screenshot;
    }));

    setNewComment('');
    setActiveCommentScreenshot(null);
  };

  const handleAddScreenshot = () => {
    const newScreenshot = {
      id: Date.now(),
      imageUrl: 'https://via.placeholder.com/400x300/00ff00',
      title: 'Новый скриншот',
      author: 'Текущий пользователь',
      rating: 0,
      userVote: 0,
      comments: []
    };
    setScreenshots(prev => [...prev, newScreenshot]);
  };

  return (
    <div className="community-page">
      <header className="community-header">
        <h1>Сообщество скриншотов</h1>
        <button className="add-screenshot-btn" onClick={handleAddScreenshot}>
          Добавить скриншот
        </button>
      </header>

      <div className="screenshots-grid">
        {screenshots.map(screenshot => (
          <div key={screenshot.id} className="screenshot-card">
            <div className="screenshot-image">
              <img src={screenshot.imageUrl} alt={screenshot.title} />
            </div>
            
            <div className="screenshot-info">
              <h3>{screenshot.title}</h3>
              <p className="author">От: {screenshot.author}</p>
              <div className="rating">Рейтинг: {screenshot.rating}</div>
            </div>

            <div className="screenshot-actions">
              <button 
                className={`vote-btn ${screenshot.userVote === 1 ? 'active' : ''}`}
                onClick={() => handleVote(screenshot.id, 1)}
              >
                👍 {screenshot.userVote === 1 ? '✓' : ''}
              </button>
              <button 
                className={`vote-btn ${screenshot.userVote === -1 ? 'active' : ''}`}
                onClick={() => handleVote(screenshot.id, -1)}
              >
                👎 {screenshot.userVote === -1 ? '✓' : ''}
              </button>
              <button 
                className="comment-btn"
                onClick={() => setActiveCommentScreenshot(
                  activeCommentScreenshot === screenshot.id ? null : screenshot.id
                )}
              >
                💬 Комментировать
              </button>
            </div>

            {activeCommentScreenshot === screenshot.id && (
              <div className="comment-section">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Оставьте ваш комментарий..."
                  rows="3"
                />
                <div className="comment-actions">
                  <button onClick={() => handleAddComment(screenshot.id)}>
                    Отправить
                  </button>
                  <button onClick={() => setActiveCommentScreenshot(null)}>
                    Отмена
                  </button>
                </div>
              </div>
            )}

            {screenshot.comments.length > 0 && (
              <div className="comments-list">
                <h4>Комментарии ({screenshot.comments.length}):</h4>
                {screenshot.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <strong>{comment.author}</strong>
                      <span className="comment-date">{comment.date}</span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;