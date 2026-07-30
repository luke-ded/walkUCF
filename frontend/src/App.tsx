import HomePage from "./HomePage.tsx";
import PrivacyPage from "./components/PrivacyPage.tsx";
import "./App.css";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  return <div>{path === "/privacy" ? <PrivacyPage /> : <HomePage />}</div>;
}

export default App;
