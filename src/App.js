import "./App.css";
import Calendar from "./component/Calendar.tsx";
import Board from "./component/Board.tsx";
import Writing from "./component/Writing.tsx";
import Login from "./component/Login.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Board />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/write" element={<Writing />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
