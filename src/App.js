import "./App.css";
import Forecast from "./components/Forecast";
const dotenv = require("dotenv").config();

function App() {
  return (
    <div className="App">
      <Forecast />
    </div>
  );
}

export default App;
