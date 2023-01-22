import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import "./PlayLevelButton.scss";

interface Props {
  url: string;
  children: string;
}

function PlayLevelButton({ url, children }: Props) {
  return (
    <Link to={url}>
      <Button>{children}</Button>
    </Link>
  );
}

export default PlayLevelButton;
