import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./ui/HomePage";
import SiegerehrungPageContainer from "./ui/SiegerehrungPageContainer";
import SpielePage from "./ui/SpielePage";
import SpielerPage from "./ui/SpielerPage";
import UnoPageContainer from "./ui/UnoPageContainer";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/uno/:id" element={<UnoPageContainer />} />
        <Route path="/" element={<HomePage />}>
          <Route index element={<SpielePage />} />
          <Route path="/spieler" element={<SpielerPage />} />
          <Route
            path="/bestenliste"
            element={<div>🚧 Under Construction 🚧</div>}
          />
        </Route>
        <Route
          path="/siegerehrungen/:id"
          element={<SiegerehrungPageContainer />}
        />
      </Routes>
    </HashRouter>
  );
}
