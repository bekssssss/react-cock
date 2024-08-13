import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

function IngredientPage() {
    const { name } = useParams();
    const [cocktails, setCocktails] = useState([]);
    const [ingredientInfo, setIngredientInfo] = useState(null);

    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`)
            .then(response => {
                setIngredientInfo(response.data.ingredients[0]);
            })
            .catch(error => {
                console.error('Ошибка при загрузке ингредиента:', error);
            });

        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`)
            .then(response => {
                setCocktails(response.data.drinks);
            })
            .catch(error => {
                console.error('Ошибка при загрузке коктейлей с этим ингредиентом:', error);
            });
    }, [name]);

    return (
        <div className="container">
            <BackButton />
            {ingredientInfo && (
                <div className="mb-4">
                    <h1>{ingredientInfo.strIngredient}</h1>
                    <p>{ingredientInfo.strDescription}</p>
                </div>
            )}
            <h3>Коктейли с этим ингредиентом:</h3>
            <div className="row">
                {cocktails.map(cocktail => (
                    <div key={cocktail.idDrink} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <Link to={`/cocktail/${cocktail.idDrink}`}>
                                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{cocktail.strDrink}</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IngredientPage;
