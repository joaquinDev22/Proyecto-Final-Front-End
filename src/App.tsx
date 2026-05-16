import Header from "./components/Header";
import Footer from "./components/Footer";

import { useDarkMode } from "./hooks/useDarkMode";
export default function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className="app">
      <Header darkMode={darkMode} />
      <main className="content">
        <h1>Welcome to My Website</h1>
        <p>This is a sample React application with dark mode support.</p>
      </main>
      <Footer/>
    </div>
  );
}