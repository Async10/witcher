import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./ui/Home";
import Siegerehrung from "./ui/Siegerehrung";
import Spiele from "./ui/Spiele";
import Spieler from "./ui/Spieler";
import UnoContainer from "./ui/UnoContainer";

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
