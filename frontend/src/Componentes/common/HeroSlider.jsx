import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

const slides = [
  { 
    id: 1, 
    text: "ADOTE UM AMIGO", 
    img: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=2000" 
  },
  { 
    id: 2, 
    text: "DOE ALIMENTO", 
    img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=2000" 
  },
  { 
    id: 3, 
    text: "SEJA VOLUNTÁRIO", 
    img: "https://images.unsplash.com/photo-1591946614421-1d935832a868?auto=format&fit=crop&q=80&w=2000" 
  }
];

const HeroSlider = ({ onCtaClick }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          {/* Overlay escuro para dar contraste ao texto branco */}
          <div className="overlay">
            <div className="slide-animado">
              <h1>{slide.text}</h1>
               <button className="btn-cta" onClick={onCtaClick}>Saiba Mais</button>
            </div>
          </div>
        </div>
      ))}

      <button className="seta esq" onClick={prevSlide}>❮</button>
      <button className="seta dir" onClick={nextSlide}>❯</button>
      
      <div className="dots-container">
        {slides.map((_, i) => (
          <span 
            key={i} 
            className={`dot ${current === i ? 'active' : ''}`} 
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;