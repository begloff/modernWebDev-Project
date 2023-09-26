import logo from "./logo.svg";
import "./App.css";
import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  "6OHTOsQWLoiO8RtGEbkQfHeL4WoO1ESEbJuMxAdB", // This is your Application ID
  "drwlRMNFUhEKH9BC1UnyVK8H7ZumRq7PgQi9pnQi", // This is your Javascript key
  "3o1bBEOpeBrjEJhrkF8zuhmtMbOegvDofjJbVOrC" // This is your Master key (never use it in the frontend)
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
