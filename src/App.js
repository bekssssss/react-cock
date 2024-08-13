import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CocktailSearch from "./components/CocktailSearch";
import CocktailPage from './pages/CocktailPage';
import IngredientPage from './pages/IngredientPage';


function App() {
  return (
      <Router>
          <CocktailSearch/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cocktail/:id" element={<CocktailPage />} />
          <Route path="/ingredient/:name" element={<IngredientPage />} />
        </Routes>

      </Router>

  );
}

export default App;
