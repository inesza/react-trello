import { useState } from "react";
import List from "./components/List/List";
import "./styles/App.css";

function App() {
  let gradient = "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)";
  const [background, setBackground] = useState(gradient);

  return (
    <div className="App" style={{ background: background }}>
      <List />
    </div>
  );
}

export default App;
