import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import SiegerehrungPage from "./ui/pages/SiegerehrungPage";
import SpielePage from "./ui/pages/SpielePage";
import SpielerPage from "./ui/pages/SpielerPage";
import UnoPage from "./ui/pages/UnoPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/uno/:id" element={<UnoPage />} />
        <Route path="/" element={<HomePage />}>
          <Route index element={<SpielePage />} />
          <Route path="/spieler" element={<SpielerPage />} />
          <Route
            path="/bestenliste"
            element={<div>🚧 Under Construction 🚧</div>}
          />
        </Route>
        <Route path="/siegerehrungen/:id" element={<SiegerehrungPage />} />
      </Routes>
    </HashRouter>
  );
}
