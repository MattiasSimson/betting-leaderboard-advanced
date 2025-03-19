import "./App.css";
import Leaderboard from "./Leaderboard/leaderboard";

// since all of the front end stuff is done in the Leaderboard, i'll just call it in the App.

function App() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Leaderboard</h2>
      </div>
      <Leaderboard />
      
      <footer style={{ display: 'flex', justifyContent: 'center', fontSize: '10px', color: 'grey'}}>
        <p>© CoolBet™. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
