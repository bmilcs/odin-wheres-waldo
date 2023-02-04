import "./Header.scss";
import waldoIcon from "../../assets/characters/waldo-icon.png";
import GitHub from "../github/Github";

function Header() {
  return (
    <header>
      <div className="column">
        <div className="title">
          <img src={waldoIcon} alt="Waldo Headshot" className="title__img" />
          <h1 className="title__text">Where's Waldo?</h1>
        </div>
        <GitHub />
      </div>
    </header>
  );
}

export default Header;
