import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Rooms } from "./Rooms";
import { StoreProvider } from "./context";
import { Home } from "./Home";
import { Room } from "./Room";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
