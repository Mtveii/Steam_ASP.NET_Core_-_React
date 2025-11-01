import React, { useState, useRef, useEffect } from 'react';
import './components_CSS/poster.css';

const ProductCard = () => {
  const slides = [
    'https://localhost:7129/pics/poster.jpg',
    'https://localhost:7129/pics/poster2.jpg',
    'https://localhost:7129/pics/poster3.jpg'
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [index, setIndex] = useState(0);
  const slidesRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      genre: "RPG, Action",
      price: "$39.99",
      discount: "-50%",
      description: "Open-world action adventure set in Night City",
      rating: "4.5/5",
      image: "cyberpunk2077.png" 
    },
    {
      id: 2,
      title: "The Witcher 3",
      genre: "RPG, Adventure",
      price: "$29.99",
      discount: "-60%",
      description: "Award-winning fantasy RPG with rich storytelling",
      rating: "4.8/5",
      image: "witcher3.png"
    },
    {
      id: 3,
      title: "Elden Ring",
      genre: "RPG, Souls-like",
      price: "$49.99",
      discount: "-40%",
      description: "Epic fantasy action RPG from FromSoftware",
      rating: "4.9/5",
      image: "eldenring.png"
    }
  ];

  // Функция для получения полного URL изображения
  const getImageUrl = (imageName) => {
    return `https://localhost:7129/pics/${imageName}`;
  };

  const cardStyle = {
    position: 'relative',
    width: '350px',
    height: '400px',
    background: 'linear-gradient(135deg, rgba(74, 107, 255, 0.9) 0%, rgba(42, 65, 180, 0.85) 100%)',
    borderRadius: '12px',
    padding: '0',
    margin: '0 15px',
 
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  };

  const cardHoverStyle = {
    transform: 'translateY(-8px)',
  };

  const infoPanelStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',


    background: 'linear-gradient(135deg, rgba(32, 201, 150, 0.12) 0%, rgba(32, 201, 150, 0.64) 100%)',
    padding: '12px',
    transform: 'translateY(100%)',
    transition: 'transform 0.4s ease-in-out',

  };

  const infoPanelVisibleStyle = {
    transform: 'translateY(0)'
  };

  // Функция для обработки ошибок загрузки изображений
  const handleImageError = (e, gameId) => {
    console.error(`Failed to load image for game ${gameId}`);
    e.target.style.display = 'none';
    // Показываем placeholder с градиентом
    e.target.parentNode.style.background = 'linear-gradient(135deg, #4a6bff 0%, #2a41b4 100%)';
  };

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
    // simple auto-advance every 6s
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const dx = touchEndX.current - touchStartX.current;
    if (!dx) return;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div className="poster-wrapper">
      <div className="poster-hero" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div className="slide" key={i} style={{ backgroundImage: `url(${s})` }} aria-hidden={i !== index} />
          ))}
        </div>

        <div className="slider-controls">
          <button className="slider-btn" onClick={prev} aria-label="Previous">‹</button>
          <button className="slider-btn" onClick={next} aria-label="Next">›</button>
        </div>
      </div>

      <div className="cards-row">
        {featuredGames.map((game) => (
          <div
            key={game.id}
            className="card"
            onMouseEnter={() => setHoveredCard(game.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img className="bg" src={getImageUrl(game.image)} alt={game.title} onError={(e) => handleImageError(e, game.id)} />
            <div className="info">
              <div>
                <h3 className="card-title">{game.title}</h3>
                <p className="card-genre">{game.genre}</p>
              </div>

              <div className="card-meta">
                <div className="card-price">{game.price} <span className="card-discount">{game.discount}</span></div>
                <div className="card-rating">{game.rating}</div>
              </div>
            </div>

            <div className={"panel " + (hoveredCard === game.id ? 'panel-visible' : '')}>
              <p className="card-desc">{game.description}</p>
              <div className="panel-actions">
                <span className="panel-note">Limited Time Offer</span>
                <button className="panel-buy">BUY NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;