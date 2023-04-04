import { useState } from "react";
import AllLists from "./components/List/AllLists";
import "./styles/App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark,
  faPlus,
  faTrash,
  faXmark,
  faAlignJustify,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlus,
  faXmark,
  faBookmark,
  faTrash,
  faAlignJustify,
  faSquareCheck
);

function App() {
  let gradient = "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)";
  const [background, setBackground] = useState(gradient);

  return (
    <div className="App" style={{ background: background }}>
      <section className="list-wrapper">
        <AllLists />
      </section>
    </div>
  );
}

export default App;
