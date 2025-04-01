import { useEffect, useRef, useState } from "react";
import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import GuessingGame from "./components/GuessingGame";
import Terminal from "./components/Terminal";
import donnee from "./donnee.json";

function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [typeMessage, setTypeMessage] = useState<"success" | "error" | "retry">(
      "success"
  );
  const [showGame, setShowGame] = useState(false);
  const [incorrectImages, setIncorrectImages] = useState<number[]>([]);

  const startTime = useRef(Date.now());
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTimeSpent(Date.now() - startTime.current);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive]);

  useEffect(() => {
    startTime.current = Date.now();
    setTimeSpent(0);
    setIsTimerActive(!!donnee.images[currentImage].indice);
  }, [currentImage]);

  useEffect(() => {
    if (currentImage === donnee.images.length - 1 && incorrectImages.length > 0) {
      donnee.images.push(...incorrectImages.map(index => donnee.images[index]));
      setIncorrectImages([]);
    }
  }, [currentImage, incorrectImages]);

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
    setTimeout(() => {
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
        setMessage(`Incorrect !`);
        setTypeMessage("error");
        setAttempts(0);
        setIncorrectImages((prev) => [...prev, currentImage]);
        setTimeout(() => {
          setCurrentImage((prev) => (prev + 1) % donnee.images.length);
          setUserAnswer("");
          setMessage("");
        }, 1000);
      } else {
        setMessage("Nope, réessaye !");
        setTypeMessage("retry");
        setAttempts(attempts + 1);
      }
    }, 50);
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  const handleCountdownStart = () => {
    shuffleArray(donnee.images);
    setShowGame(true);
  };

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
      <main className="main-container">
        <div className="main-container-game">
          {showGame && (
              <>
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
              </>
          )}
          {message && <p className={`message ${typeMessage}`}>{message}</p>}
        </div>

        <div className="main-container-content">
          <CountdownTimer onCountdownStart={handleCountdownStart} />
          <GuessingGame score={score} onScoreChange={handleScoreChange} />
          <Terminal
              indice={donnee.images[currentImage].indice || ""}
              timeSpent={timeSpent}
          />
        </div>
      </main>
  );
}

export default App;