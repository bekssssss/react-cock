import React, { useState } from 'react';
import axios from 'axios';

function CocktailSearch() {
    const [searchLetter, setSearchLetter] = useState('');
    const [cocktails, setCocktails] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchLetter}`);
            setCocktails(response.data.drinks);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="cocktail-search">
            <input
                type="text"
                value={searchLetter}
                onChange={(e) => setSearchLetter(e.target.value)}
                placeholder="Enter a letter"
                maxLength={1}
            />
            <button onClick={handleSearch}>Search</button>

            <div className="cocktail-list">
                {cocktails ? (
                    cocktails.map((cocktail) => (
                        <div key={cocktail.idDrink} className="cocktail-item">
                            <h3>{cocktail.strDrink}</h3>
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                        </div>
                    ))
                ) : (
                    <p>No cocktails found.</p>
                )}
            </div>
        </div>
    );
}

export default CocktailSearch;
