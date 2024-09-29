import { ThemeProvider } from "./components/theme-provider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css"
import ProjectView from "./pages/ProjectView";
import Footer from "./pages/sub-section/Footer";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view/project/:id" element={<ProjectView />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
