import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function App() {
  const [stringToSave, setStringToSave] = useState("");

  const [savedStrings, setSavedStrings] = useState([]);

  const handleStringSave = () => {
    socket.emit("saveString", stringToSave);
  };

  const handleTyping = () => {
    socket.emit("saveString", true);
  };

  useEffect(() => {
    socket.on("saveStringResponse", (data) => {
      setSavedStrings(data);
    });
  }, []);

  return (
    <div>
      <label>String to save</label>
      <input
        type="text"
        onChange={(e) => setStringToSave(e.target.value)}
        onKeyDown={handleTyping}
      />
      <button type="button" onClick={handleStringSave}>
        Save string
      </button>

      <h1>Saved strings:</h1>
      {savedStrings.map((item) => (
        <h1>{item}</h1>
      ))}
    </div>
  );
}

export default App;
