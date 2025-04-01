import React, { useState, useEffect } from "react";

interface GuessingGameProps {
    score: number;
    onScoreChange: (newScore: number) => void;
}

const GuessingGame: React.FC<GuessingGameProps> = ({ score, onScoreChange }) => {
    const [currentScore, setCurrentScore] = useState(score);
    const [letters, setLetters] = useState([
        { letter: "N", disabled: false },
        { letter: "E", disabled: false },
        { letter: "X", disabled: false },
        { letter: "T", disabled: false },
        { letter: "S", disabled: false },
        { letter: "T", disabled: false },
        { letter: "E", disabled: false },
        { letter: "P", disabled: false },
    ]);

    useEffect(() => {
        setCurrentScore(score);
    }, [score]);

    const handleLetterClick = (index: number) => {
        if (currentScore >= 16) {
            const newScore = currentScore - 16;
            setCurrentScore(newScore);
            onScoreChange(newScore);
            setLetters(letters.map((item, i) =>
                i === index ? { ...item, disabled: true } : item
            ));
        }
    };

    return (
        <>
            <div>
                <p>L'objectif de ce défi est de découvrir la commande à entrer dans le terminal en achetant chaque lettre à l'aide des points remportés pour chaque réponse correcte</p>
                <p>Current Score: {currentScore}</p>
                {letters.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleLetterClick(index)}
                        disabled={item.disabled}
                        className={`letter-button ${item.disabled ? 'disabled' : ''}`}
                    >
                        {item.disabled ? item.letter : "?"}
                    </button>
                ))}
            </div>
        </>
    );
}

export default GuessingGame;