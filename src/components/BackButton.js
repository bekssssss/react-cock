import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4">
            Назад
        </button>
    );
}

export default BackButton;
