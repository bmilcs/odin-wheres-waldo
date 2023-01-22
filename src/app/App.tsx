import { Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import Home from "../pages/home/Home";
import Level from "../pages/level/Level";
import { LEVEL_DATA, LevelObject } from "../data/levelData";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {LEVEL_DATA.map((level: LevelObject) => {
            return (
              <Route
                key={level.id}
                path={`/level/${level.id}`}
                element={<Level {...level} />}
              />
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
