import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./ui/HomePage";
import Siegerehrung from "./ui/SiegerehrungPage";
import Spiele from "./ui/SpielePage";
import Spieler from "./ui/SpielerPage";
import UnoContainer from "./ui/UnoPageContainer";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/uno/:id" element={<UnoContainer />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Spiele />} />
          <Route path="/spieler" element={<Spieler />} />
          <Route
            path="/bestenliste"
            element={<div>🚧 Under Construction 🚧</div>}
          />
        </Route>
        <Route path="/siegerehrungen/:id" element={<Siegerehrung />} />
      </Routes>
    </HashRouter>
  );
}
