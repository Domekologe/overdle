import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Menu from './Menu';
import GuessHero from './guessHero';
import GuessAbility from './guessAbility';
import GuessEmote from './guessEmote';
import GuessQuote from './guessQuote';
import GuessSplashHero from './guessSplashHero';
import GuessSplashMap from './guessSplashMap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/guessHero" element={<GuessHero />} />
      <Route path="/guessAbility" element={<GuessAbility />} />
      <Route path="/guessEmote" element={<GuessEmote />} />
      <Route path="/guessQuote" element={<GuessQuote />} />
      <Route path="/guessSplashHero" element={<GuessSplashHero />} />
      <Route path="/guessSplashMap" element={<GuessSplashMap />} />
    </Routes>
  </Router>
);
