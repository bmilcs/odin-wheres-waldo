import { LEVEL_DATA } from "../../data/levelData";
import LevelCard from "./components/level-card/LevelCard";
import "./Home.scss";

function Home() {
  return (
    <div className="column home">
      <h2 className="home__title">Choose Your Adventure:</h2>
      <div className="home__card-grid">
        {LEVEL_DATA.map((level) => (
          <LevelCard {...level} key={level.name} />
        ))}
      </div>
    </div>
  );
}

export default Home;
