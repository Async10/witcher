import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./ui/Home";
import Spiele from "./ui/Spiele";
import Spieler from "./ui/Spieler";
import Uno from "./ui/Uno";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/uno/:id" element={<Uno />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Spiele />} />
          <Route path="/spieler" element={<Spieler />} />
          <Route
            path="/bestenliste"
            element={
              <div>
                🚧🚧🚧
                <br />
                Sorry, die Bestenliste ist noch nicht implementiert.
                <br />
                🚧🚧🚧
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
