import "./Header.scss";
import waldoIcon from "../../assets/characters/waldo-icon.png";

function Header() {
  const PageTitle = (
    <div className="title__container">
      <img src={waldoIcon} alt="Waldo Headshot" className="title__img" />
      <h1 className="title__text">Where's Waldo?</h1>
    </div>
  );

  return (
    <header>
      <div className="column">
        {PageTitle}
        <p>PLACEHOLDER</p>
      </div>
    </header>
  );
}

export default Header;
