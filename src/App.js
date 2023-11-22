import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ClickGameHome from './components/ClickGameApp';
import ClickGameLeaderboard from './components/ClickGameLeaderboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ClickGameHome/>}></Route>
          <Route path='leaderboard' element={<ClickGameLeaderboard/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
