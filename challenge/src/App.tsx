import { useState } from "react";
import "./App.css";
import Terminal from "./components/Terminal";
import donnee from "./donnee.json";
import GuessingGame from "./components/GuessingGame";
import CountdownTimer from "./components/CountdownTimer";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [typeMessage, setTypeMessage] = useState<"success" | "error" | "retry">(
      "success"
  );

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "perso":
        return "Personnage";
      case "lieu":
        return "Lieu";
      case "nom":
        return "Nom de jeu";
      default:
        return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentItem = donnee.images[currentImage];
    const isCorrect = currentItem.reponse.some(
        (rep) => rep.toLowerCase() === userAnswer.toLowerCase()
    );

    if (isCorrect) {
      setScore(score + currentItem.valeur);
      setMessage(`Correct ! +${currentItem.valeur} points`);
      setTypeMessage("success");
      setAttempts(0);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % donnee.images.length);
        setUserAnswer("");
        setMessage("");
      }, 1000);
    } else if (attempts >= 1) {
      setMessage(`Incorrect !`); // La réponse était : ${currentItem.reponse[0]
      setTypeMessage("error");
      setAttempts(0);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % donnee.images.length); //setCurrentImage(Math.floor(Math.random() * donnee.images.length))
        setUserAnswer("");
        setMessage("");
      }, 1000);
    } else {
      setMessage("Nope, réessaye !");
      setTypeMessage("retry");
      setAttempts(attempts + 1);
    }
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <>
      <main className="main-container">
        <div className="main-container-game">
          <div className="game-header">
            <div className="type-indicator">
              {getTypeLabel(donnee.images[currentImage].type)} ?
            </div>
          </div>

          <div className="game-content">
            <img
              src={donnee.images[currentImage].url}
              alt="Image à deviner"
              className="game-image"
            />
            <form onSubmit={handleSubmit} className="game-form">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Votre réponse..."
                className="game-input"
                autoFocus={true}
              />
              <button type="submit" className="game-button">
                Valider
              </button>
            </form>
          </div>

          {message && <p className={`message ${typeMessage}`}>{message}</p>}
        </div>

        <div className="main-container-content">
          <CountdownTimer/>
          <GuessingGame score={score} onScoreChange={handleScoreChange}/>
          <Terminal />
        </div>
      </main>
    </>
  );
}

export default App;
