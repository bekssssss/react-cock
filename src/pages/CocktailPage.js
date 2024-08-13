import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';

function CocktailPage() {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => {
                setCocktail(response.data.drinks[0]);
            })
            .catch(error => {
                console.error('Ошибка при загрузке деталей коктейля:', error);
            });
    }, [id]);

    if (!cocktail) {
        return <div className="container">Загрузка...</div>;
    }

    return (
        <div className="container">
            <BackButton />
            <div className="row my-4">
                <div className="col-md-6">
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h1>{cocktail.strDrink}</h1>
                    <p>{cocktail.strInstructions}</p>
                    <h3>Ингредиенты:</h3>
                    <ul className="list-group">
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(i => {
                            const ingredient = cocktail[`strIngredient${i}`];
                            const measure = cocktail[`strMeasure${i}`];
                            return ingredient ? (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <Link to={`/ingredient/${ingredient}`}>
                                        {ingredient}
                                    </Link>
                                    <span>{measure}</span>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            </div>
            {cocktail.strVideo && (
                <div className="my-4">
                    <h3>Видео:</h3>
                    <iframe
                        width="100%"
                        height="400"
                        src={cocktail.strVideo}
                        title={cocktail.strDrink}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
}

export default CocktailPage;
