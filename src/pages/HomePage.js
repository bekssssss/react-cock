import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from '../App.css';
import axios from 'axios';

function HomePage() {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
            .then(response => {
                setCocktails(response.data.drinks);
            })
            .catch(error => {
                console.error('Ошибка при загрузке коктейлей:', error);
            });
    }, []);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Коктейли</h1>
            <div className="row">
                {cocktails.map(cocktail => (
                    <div key={cocktail.idDrink} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{cocktail.strDrink}</h5>
                                <Link to={`/cocktail/${cocktail.idDrink}`} className="btn btn-primary">
                                    Подробнее
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
