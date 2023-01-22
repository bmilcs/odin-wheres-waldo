import { MapObject } from "../../data/mapData";
import "./Map.scss";

function Map({
  id,
  name,
  characters,
  preview,
  fullSize,
  description,
}: MapObject) {
  return (
    <div className="map">
      <p>Level Goes Here!</p>
    </div>
  );
}

export default Map;
