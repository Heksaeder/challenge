import { useEffect, useRef, useState } from "react";
import "./Terminal.css";

const Terminal = ({
  indice,
  timeSpent,
}: {
  indice: string;
  timeSpent: number;
}) => {
  const commands: {
    name: string;
    description: string;
    action: () => string;
  }[] = [
    {
      name: "nextstep",
      description: "Voir Terence",
      action: () => "Etape 2: allez voir Térence",
    },
    {
      name: "rm-f-all-6194",
      description: "Permet de reussir le challenge",
      action: () => "Bravo vous avez gagné le challenge 48h !",
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

  const [currentIndice, setCurrentIndice] = useState<string | null>(null);
  const previousIndiceRef = useRef<string | null>(null);

  const username = "visitor";
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indice !== previousIndiceRef.current) {
      setCurrentIndice(null);
      previousIndiceRef.current = indice;
    }
  }, [indice]);

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
    if (timeSpent >= 5000 && indice && indice.trim() !== "" && !currentIndice) {
      appendUserInput("indice");
      appendOutput(indice);
      setCurrentIndice(indice);
    }
  }, [timeSpent, indice, currentIndice]);

  function processCommand(userInput: string) {
    const [command, ...args] = userInput.split(" ");
    const cmd = commands.find((c) => c.name === command);

    appendUserInput(userInput);
    if (cmd) {
      const result = cmd.action();
      if (result) appendOutput(result);
      if (command === "nextstep") {
        commands.push({
          name: "6194",
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
