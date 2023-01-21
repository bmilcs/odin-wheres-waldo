import React from "react";
import MapCard from "../../components/map-card/MapCard";
import { MAP_DATA } from "../../data/mapData";
import "./Home.scss";

function Home() {
  return (
    <div className="column">
      <h2 className="home__title">Choose Your Adventure:</h2>
      <div className="home__container">
        {MAP_DATA.map((map) => (
          <MapCard {...map} key={map.name} />
        ))}
      </div>
    </div>
  );
}

export default Home;
