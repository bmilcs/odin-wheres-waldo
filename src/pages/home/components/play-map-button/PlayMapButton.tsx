import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import "./PlayMapButton.scss";

interface Props {
  url: string;
  children: string;
}

function PlayMapButton({ url, children }: Props) {
  return (
    <Link to={url}>
      <Button>{children}</Button>
    </Link>
  );
}

export default PlayMapButton;
