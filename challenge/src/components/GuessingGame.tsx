import React, { useState, useEffect } from "react";

interface GuessingGameProps {
    score: number;
    onScoreChange: (newScore: number) => void;
}

const GuessingGame: React.FC<GuessingGameProps> = ({ score, onScoreChange }) => {
    const [currentScore, setCurrentScore] = useState(score);
    const [letters, setLetters] = useState([
        { letter: "N", disabled: false, price: 15 },
        { letter: "E", disabled: false, price: 16 },
        { letter: "X", disabled: false, price: 17 },
        { letter: "T", disabled: false, price: 18 },
        { letter: "S", disabled: false, price: 19 },
        { letter: "T", disabled: false, price: 15 },
        { letter: "E", disabled: false, price: 16 },
        { letter: "P", disabled: false, price: 17 },
    ]);

    useEffect(() => {
        setCurrentScore(score);
    }, [score]);

    const handleLetterClick = (index: number) => {
        if (currentScore >= letters[index].price) {
            const newScore = currentScore - letters[index].price;
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
                <div className={`texte-explicatif`}>Une commande terminal est requise pour accéder au code déclenchant le programme mettant fin à l'existence de Nemesis. Chaque réponse vous vaudra des points afin de débloquer les caractères de la commande selon la valeur indiquée dans l'angle inférieur droit. Soyez rapides, soyez efficaces mais surtout, soyez patients. Le monde repose sur vos épaules.</div>
                <span className={`current-score`}>${currentScore}</span>
                <div className="letters">
                {letters.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleLetterClick(index)}
                        disabled={item.disabled}
                        className={`letter-button ${item.disabled ? 'disabled' : ''}`}
                    >
                        {item.disabled ? item.letter : "?"}
                        <span className="letter-price">{item.price}</span>
                    </button>
                ))}
                </div>
            </div>
        </>
    );
}

export default GuessingGame;