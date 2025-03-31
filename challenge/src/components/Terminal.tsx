import { useEffect, useRef, useState } from "react";
import "./Terminal.css";

const Terminal = () => {
  const commands: {
    name: string;
    description: string;
    action: () => string;
  }[] = [
    {
      name: "terence",
      description: "Voir Terence",
      action: () => "Etape 2 aller voir Terence",
    },
    {
      name: "clear",
      description: "Clears the terminal",
      action: () => {
        const output = document.getElementById("output");
        if (output) {
          output.innerHTML = "";
        }
        return "";
      },
    },
  ];

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentIndice, setCurrentIndice] = useState<string | null>(null);
  const [lastIndiceTime, setLastIndiceTime] = useState(0);

  const username = "visitor";
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeElapsed >= 10 && lastIndiceTime < 10) {
      setCurrentIndice("Ce jeu est sortie en 2010");
      setLastIndiceTime(10);
    } else if (timeElapsed >= 20 && lastIndiceTime < 20) {
      setCurrentIndice("Ce jeu est sortie en 2018");
      setLastIndiceTime(20);
    } else if (timeElapsed >= 40 && lastIndiceTime < 40) {
      setCurrentIndice("Ce jeu est sortie en 2015");
      setLastIndiceTime(40);
    }
  }, [timeElapsed, lastIndiceTime]);

  useEffect(() => {
    if (currentIndice) {
      const timer = setTimeout(() => {
        setCurrentIndice(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentIndice]);

  useEffect(() => {
    const input = document.getElementById("commandInput") as HTMLInputElement;
    const output = outputRef.current;

    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const userInput = input.value.trim();
          if (userInput) {
            processCommand(userInput);
            input.value = "";
          }
        }
      });
    }

    return () => {
      if (input) {
        input.removeEventListener("keydown", () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (currentIndice) {
      appendUserInput("indice");
      appendOutput(currentIndice);
    }
  }, [currentIndice]);

  function processCommand(userInput: string) {
    const [command, ...args] = userInput.split(" ");
    const cmd = commands.find((c) => c.name === command);

    appendUserInput(userInput);
    if (cmd) {
      const result = cmd.action();
      if (result) appendOutput(result);
      if (command === "terence") {
        commands.push({
          name: "1234",
          description: "Entrer le code",
          action: () => "Bravo vous avez gagné le challenge 48h !",
        });
      }
    } else {
      appendOutput(`Commande non reconnue: ${userInput}`);
    }
  }

  function appendUserInput(command: string) {
    const output = outputRef.current;
    if (!output) return;

    const newLine = document.createElement("div");
    const userSpan = document.createElement("span");
    const commandSpan = document.createElement("span");
    userSpan.classList.add("username");
    userSpan.textContent = `${username}:~$ `;
    commandSpan.textContent = command;

    newLine.append(userSpan);
    newLine.append(commandSpan);

    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight;
  }

  function appendOutput(text: string) {
    const output = outputRef.current;
    if (!output) return;

    const newLine = document.createElement("div");
    newLine.textContent = text;
    output.appendChild(newLine);
    output.scrollTop = output.scrollHeight;
  }

  return (
    <div className="terminal">
      <div className="window-header">
        <span className="title">Terminal</span>
        <div className="icon-wrapper">
          <span>—</span>
          <span>☐</span>
          <span>x</span>
        </div>
      </div>
      <div id="output" ref={outputRef}>
        <div>Bienvenue au Challenge 48h !!</div>
      </div>
      <div className="input-line">
        <span className="prompt">visitor:~$</span>
        <input type="text" id="commandInput" autoComplete="off" autoFocus />
      </div>
    </div>
  );
};

export default Terminal;
