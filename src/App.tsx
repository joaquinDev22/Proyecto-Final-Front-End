import Header from "./components/Header";

import { useDarkMode } from "./hooks/useDarkMode";
export default function App() {
  const { darkMode } = useDarkMode();
  return (
    <>
      <Header darkMode={darkMode} />
    </>
  );
}