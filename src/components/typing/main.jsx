import React, { useState, useEffect } from "react";

const TypingPractice = () => {
  const [inputValue, setInputValue] = useState("");
  const [textToType, setTextToType] = useState("Type this sentence to practice your typing skills.");
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (!startTime) {
      setStartTime(new Date().getTime());
    }

    if (e.target.value === textToType) {
      const elapsedTimeInSeconds = (new Date().getTime() - startTime) / 1000;
      const words = textToType.split(" ").length;
      const wordsPerMinute = Math.round(words / (elapsedTimeInSeconds / 60));
      setWordsPerMinute(wordsPerMinute);
      setIsFinished(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        const currentWord = inputValue.trim().split(" ").pop();
        const expectedWord = textToType.split(" ")[inputValue.split(" ").length - 1];
        if (currentWord !== expectedWord) {
          setMistakes(mistakes + 1);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [inputValue, mistakes, textToType]);

  useEffect(() => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setTextToType(randomSentence);
    setInputValue("");
    setWordsPerMinute(0);
    setMistakes(0);
    setStartTime(null);
    setIsFinished(false);
  }, [isFinished]);

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly.",
    "Pack my box with five dozen liquor jugs.",
    "A quick brown fox jumps over the lazy dog.",
    "Amazingly few discotheques provide jukeboxes.",
    "My girl wove six dozen plaid jackets before she quit.",
    "Grumpy wizards make toxic brew for the evil Queen and Jack.",
    "The jay, pig, fox, zebra, and my wolves quack!",
    "The quick onyx goblin jumps over the lazy dwarf.",
    "Waltz, nymph, for quick jigs vex Bud.",
    "Quick zephyrs blow, vexing daft Jim.",
    "Sex prof gives back no quiz with mild joy.",
    "The big dwarf only jumps.",
  ];

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Practice</h1>
      <p className="mb-4">{textToType}</p>
      <input
        type="text"
        className="border border-gray-400 rounded p-2 w-full mb-4"
        value={inputValue}
        onChange={handleInputChange}
        disabled={isFinished}
      />
      {isFinished && (
      <div className="flex justify-between mb-4">
        <div>
          <span className="font-bold">{wordsPerMinute}</span> wpm
        </div>
        <div>
          <span className="font-bold">{mistakes}</span> mistakes
        </div>
      </div>)}
      {isFinished && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
          onClick={() => setIsFinished(false)}
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default TypingPractice;


