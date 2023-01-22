import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Home from "../pages/home/Home";
import Map from "../pages/map/Map";
import { MAP_DATA, MapObject } from "../data/mapData";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {MAP_DATA.map((map: MapObject) => {
            return (
              <Route
                key={map.id}
                path={`/map/${map.id}`}
                element={<Map {...map} />}
              />
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
